import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UserService } from './services/user.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from "./AuthInterceptor";
import { ViewMailsComponent } from './view-mails/view-mails.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSortModule,
  MatTableModule,
  MatNativeDateModule,
  MatSelectModule, MatAutocompleteModule
} from '@angular/material';
import { SendMessageComponent } from './send-message/send-message.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ViewLogsComponent } from './view-logs/view-logs.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ZeroValueFilter } from "./view-logs/view-logs.component";

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUsersComponent,
    LoginComponent,
    ViewMailsComponent,
    SendMessageComponent,
    NavigationComponent,
    ViewLogsComponent,
    ZeroValueFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule
  ],
  providers: [UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
