import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/Message";
import {MailService} from "../../services/mail.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  private newMessage: Message;
  private usernameList: string[] = [];
  private feedback;
  myControl = new FormControl();

  constructor(private mailServ: MailService, private userServ: UserService, private router: Router) { }

  ngOnInit() {
    this.newMessage = {
      date: '',//Will be handled by the server
      from: '',//Will be handled by the server
      to: '',
      messageText: ''
    };

    this.feedback = '';
  }
  public sendMessage(){
    this.mailServ.sendMessage(this.newMessage).subscribe(
      response => {
        if (response["success"] == true){
          this.feedback = 'Message sent!';
        }
        else{
          this.feedback = 'Message could not send';
        }
      }
    );
  }
  public loadUsernames(){
    this.userServ.getAllUsernames().subscribe(
      response => this.usernameList = response);
  }
  public searchUsers(){
    if (this.newMessage.to != ''){
      this.userServ.searchUsers(this.newMessage.to).subscribe(
        response => this.usernameList = response);
    }
  };
}
