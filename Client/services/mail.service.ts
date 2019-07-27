import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Message} from "../models/Message";

import 'rxjs/add/operator/map';
import {User} from "../models/User";
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  private serverApi= 'http://localhost:3000';

  public getInbox():Observable<Message[]> {
    let URI = this.serverApi + '/myApp/Mails/inbox';
    return this.http.get(URI).map(res => <Message[]>res["messages"]);
  }

  public getOutbox():Observable<Message[]> {
    let URI = this.serverApi + '/myApp/Mails/outbox';
    return this.http.get(URI).map(res => <Message[]>res["messages"]);
  }

  public sendMessage(message: Message){
    let URI = this.serverApi + '/myApp/Mails';
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, message,{headers: headers});
  }
}
