import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Schedule } from './schedule.interface';

import { User } from './user.interface';
import { YogaClass } from './yoga-class.interface';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  public userAuthenticated: boolean;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  getAttendee(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges()
  }

  generateClassUid() {
    return this.afs.createId()
  }

  getScheduledClasses() {
    return this.afs.collection('classes', ref => ref.orderBy('datetime')).valueChanges()
  }

  getClassByUid(classUid) {
    return this.afs.collection('classes').doc(classUid).valueChanges()
  }

  async login(credentials) {
    const credential = await this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    return credential
  }

  logout() {
    return this.afAuth.signOut()
  }

  async register(credentials) {
    await this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
      response => {
        let user: User = {
          uid: response.user.uid,
          email: response.user.email,
          classes: [],
          admin: false,
        }
        this.afs.collection('users').doc(user.uid).set(
          user,
          { merge: true }
        ).then(
          response => {
            this.login(credentials)
          }
        )
      }
    )
  }

  async joinClass(classUid) {
    let currentUser = (await this.afAuth.currentUser)
    if (currentUser) {
      let userUid = currentUser.uid;
      this.afs.firestore.runTransaction(
        async transaction => {
          let userDocRef = this.afs.firestore.collection('users').doc(userUid)
          let userDoc = await userDocRef.get()
  
          let schedulesDocRef = this.afs.firestore.collection('schedules').doc(classUid)
          let schedulesDoc = await schedulesDocRef.get()
  
          let classes = await userDoc.get('classes')
          if (!classes.includes(classUid)) {
            classes.push(classUid)
          }
          
          transaction.update(
            userDocRef,
            { classes: classes }
          )
  
          let recipients = await schedulesDoc.get('recipients')
          if (!recipients.includes(userUid)) {
            recipients.push(userUid)
          }
          
          transaction.update(
            schedulesDocRef,
            { recipients: recipients }
          )
  
        }
      )
    } else {
      this.router.navigate(['home'])
    }
  }

  async leaveClass(classUid) {
    let now = new Date()
    let tasks = await this.afs.firestore.collection('schedules').where('emailTime', '>=', now).where('sent', '==', false).get();
    console.log(tasks.docChanges()[0].doc.data())
    let userUid = (await this.afAuth.currentUser).uid;
    this.afs.firestore.runTransaction(
      async transaction => {
        let userDocRef = this.afs.firestore.collection('users').doc(userUid)
        let userDoc = await userDocRef.get()

        let schedulesDocRef = this.afs.firestore.collection('schedules').doc(classUid)
        let schedulesDoc = await schedulesDocRef.get()

        let classes = await userDoc.get('classes')
        if (classes.includes(classUid)) {
          let i = classes.indexOf(classUid)
          classes.splice(i, 1)
        }
        
        transaction.update(
          userDocRef,
          { classes: classes }
        )

        let recipients = await schedulesDoc.get('recipients')
        if (recipients.includes(userUid)) {
          let i = recipients.indexOf(userUid)
          recipients.splice(i, 1)
        }
        
        transaction.update(
          schedulesDocRef,
          { recipients: recipients }
        )

      }
    )
  }

  addClass(yogaClass: YogaClass) {
    let schedule: Schedule = {
      emailTime: new Date(yogaClass.datetime.getTime() - 60*60000),
      recipients: [],
      sent: false
    }
    return this.afs.firestore.runTransaction(
      async transaction => {
        transaction.set(
          this.afs.firestore.collection('schedules').doc(yogaClass.uid),
          schedule,
          {merge:true}
        )
        transaction.set(
          this.afs.firestore.collection('classes').doc(yogaClass.uid),
          yogaClass,
          {merge:true}
        )
      }
    )
  }

  updateClass(yogaClass: YogaClass) {
    let schedule: Schedule = {
      emailTime: new Date(yogaClass.datetime.getTime() - 60*60000)
    }
    return this.afs.firestore.runTransaction(
      async transaction => {
        transaction.set(
          this.afs.firestore.collection('schedules').doc(yogaClass.uid),
          schedule,
          {merge:true}
        )
        transaction.set(
          this.afs.firestore.collection('classes').doc(yogaClass.uid),
          yogaClass,
          {merge:true}
        )
      }
    )
  }

  deleteClass(uid: string) {
    return this.afs.collection('classes').doc(uid).delete()
  }

  async userIsAuthenticated() {
    if (await this.afAuth.currentUser) {
      return true
    }
    return false
  }

  getScheduleData(classUid: string) {
    return this.afs.collection('schedules').doc(classUid).valueChanges()
  }

  getUserByUid(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges()
  }

  async deleteUser() {
    let user = await this.afAuth.currentUser
    let uid = user.uid
    return this.afs.firestore.runTransaction(
      async transaction => {
        this.afs.collection('schedules').get().forEach(
          schedule => {
            schedule.docChanges().forEach(
              snap => {
                let scheduleId = snap.doc.id
                let scheduleData = snap.doc.data()
                let recipients = scheduleData.recipients
                if (recipients.includes(uid)) {
                  let i = recipients.indexOf(uid)
                  recipients.splice(i, 1)
                }
                this.afs.collection('schedules').doc(scheduleId).set(
                  { recipients: recipients },
                  { merge: true }
                )
              }
            )
          }
        )
        this.afs.collection('users').doc(uid).delete()
        user.delete()
      }
    )
  }
}
