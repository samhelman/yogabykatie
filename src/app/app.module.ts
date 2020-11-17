import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminClassWidgetComponent } from './widgets/admin-class-widget/admin-class-widget.component';
import { AddClassWidgetComponent } from './widgets/add-class-widget/add-class-widget.component';
import { PublicClassWidgetComponent } from './widgets/public-class-widget/public-class-widget.component';
import { LoginWidgetComponent } from './widgets/login-widget/login-widget.component';
import { RegisterWidgetComponent } from './widgets/register-widget/register-widget.component';
import { FireService } from './services/fire.service';
import { AccountInfoWidgetComponent } from './widgets/account-info-widget/account-info-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletePromptWidgetComponent } from './widgets/delete-prompt-widget/delete-prompt-widget.component';
import { FlashMessagesWidgetComponent } from './flash-messages/flash-messages-widget/flash-messages-widget.component';
import { DeleteAccountPromptWidgetComponent } from './widgets/delete-account-prompt-widget/delete-account-prompt-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    ClassesComponent,
    AdminComponent,
    AdminClassWidgetComponent,
    AddClassWidgetComponent,
    PublicClassWidgetComponent,
    LoginWidgetComponent,
    RegisterWidgetComponent,
    AccountInfoWidgetComponent,
    DeletePromptWidgetComponent,
    FlashMessagesWidgetComponent,
    DeleteAccountPromptWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    FireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
