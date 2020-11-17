// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const NAME = functions.config().sendgrid.name;
const FROM_EMAIL = functions.config().sendgrid.from_email;
const STARTING_TEMPLATE_ID = functions.config().sendgrid.starting_template_id;
const UPDATED_CLASS_TEMPLATE_ID = functions.config().sendgrid.updated_class_template_id;
const CANCELLED_CLASS_TEMPLATE_ID = functions.config().sendgrid.cancelled_class_template_id;
sgMail.setApiKey(API_KEY);

// function sends an email with the new class data when it is updated
export const updatedClass = functions.firestore.document('classes/{classId}').onUpdate( async (change, context) => {

  // Read the post document
  const classSnap = await db.collection('classes').doc(context.params.classId).get();
  const scheduleSnap = await db.collection('schedules').doc(context.params.classId).get();

  // Raw Data
  const classData = classSnap.data();
  const scheduleData = scheduleSnap.data();

  let recipients: Array<string> = []
  for (let uid of scheduleData.recipients) {
    let email = (await db.collection('users').doc(uid).get()).data().email
    recipients.push(email)
  }
  
  const name = classData.name

  let datetime = classData.datetime
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let day = datetime.toDate().getDate()
  let month = months[datetime.toDate().getMonth()]
  let year = datetime.toDate().getFullYear()
  const date = `${day} ${month}, ${year}`

  const time = `${classData.estTime.substring(16,21)} EST`
  
  // Email
  const msg = {
    to: recipients,
    from: {
      email: FROM_EMAIL, 
      name: NAME
    },
    templateId: UPDATED_CLASS_TEMPLATE_ID,
    dynamic_template_data: {
      name: name,
      date: date,
      time: time
    },
  };

  // Send it
  return sgMail.send(msg);

});

//function to notify users if a class has been cancelled/deleted
export const cancelledClass = functions.firestore.document('classes/{classId}').onDelete(async (change, context) => {

  const classData = change.data();
  const scheduleSnap = await db.collection('schedules').doc(context.params.classId).get();
  const scheduleData = scheduleSnap.data();
  console.log(classData)

  let recipients: Array<string> = []
  for (let uid of scheduleData.recipients) {
    let email = (await db.collection('users').doc(uid).get()).data().email
    recipients.push(email)
  }

  const name = classData.name

  let datetime = classData.datetime
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let day = datetime.toDate().getDate()
  let month = months[datetime.toDate().getMonth()]
  let year = datetime.toDate().getFullYear()
  const date = `${day} ${month}, ${year}`

  const time = `${classData.estTime.substring(16,21)} EST`

  //delete schedule
  db.collection('schedules').doc(context.params.classId).delete()

  // Email
  const msg = {
    to: recipients,
    from: {
      email: FROM_EMAIL, 
      name: NAME
    },
    templateId: CANCELLED_CLASS_TEMPLATE_ID,
    dynamic_template_data: {
        name: name,
        date: date,
        time: time
    },
  };

  // Send it
  return sgMail.send(msg);

});

export const startingClass = functions.pubsub.schedule('every 15 minutes').onRun(async (context) => {

  const now = admin.firestore.Timestamp.now();

  const query = db.collection('schedules').where('emailTime', '<=', now).where('sent', '==', false)
  const tasks = await query.get();

  tasks.docChanges().forEach(
    async snapshot => {
      const classId = snapshot.doc.id
      const data = snapshot.doc.data()

      let recipients: Array<string> = []
      for (let uid of data.recipients) {
        let email = (await db.collection('users').doc(uid).get()).data().email
        recipients.push(email)
      }

      let zoomId = (await db.collection('classes').doc(classId).get()).data().zoomId

      // Email
      const msg = {
        to: recipients,
        from: {
          email: FROM_EMAIL, 
          name: NAME
        },
        templateId: STARTING_TEMPLATE_ID,
        dynamic_template_data: {
            zoomId: zoomId,
        },
      };

      // Send it
      sgMail.send(msg);

      //set sent to true
      db.collection('schedules').doc(classId).set(
        { sent: true },
        { merge: true }
      )
    }
  )

})