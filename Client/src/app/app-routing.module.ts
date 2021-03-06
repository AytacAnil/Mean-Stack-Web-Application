import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { ViewUsersComponent } from "./components/view-users/view-users.component";
import { ViewMailsComponent } from './components/view-mails/view-mails.component';
import { SendMessageComponent } from "./components/send-message/send-message.component";
import { NavigationComponent } from "./components/navigation/navigation.component"
import { ViewLogsComponent } from "./components/view-logs/view-logs.component";

const routes: Routes = [
  { path: 'myApp/login', component: LoginComponent},
  { path: 'myApp', component: NavigationComponent,
    children:[
      { path: 'Users', component: ViewUsersComponent},
      { path: 'Sessions', component: ViewLogsComponent},
      { path: 'Mails/inbox', component: ViewMailsComponent},
      { path: 'Mails/outbox', component: ViewMailsComponent},
      { path: 'Mails', component: SendMessageComponent},]},
  { path: '**', redirectTo: 'myApp/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
