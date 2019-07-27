import {Component, OnInit} from '@angular/core';
import {MailService} from "../services/mail.service";
import {Message} from "../models/Message";
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort"

@Component({
  selector: 'app-view-mails',
  templateUrl: './view-mails.component.html',
  styleUrls: ['./view-mails.component.css']
})
export class ViewMailsComponent implements OnInit {
  private inbox: Message[] = [];
  private outbox: Message[] = [];
  private inboxing = true;

  constructor(private mailServ: MailService, private router: Router) {}

  ngOnInit() {
    //Check the token
    if (localStorage.getItem("authToken") == null){
      this.router.navigateByUrl('/myApp/login');
    }
    //Load all list on init
    this.loadInbox();
    this.loadOutbox();
    if (this.router.url != '/myApp/Mails/inbox'){
      this.inboxing = false;
    }
  }
  public loadInbox() {
    //Get all lists from server and update the lists property
    this.mailServ.getInbox().subscribe(
      response => this.inbox = response);
  }
  public loadOutbox() {
    //Get all lists from server and update the lists property
    this.mailServ.getOutbox().subscribe(
      response => this.outbox = response);
  }

  public messageList(){
    if (this.inboxing){
      return this.inbox.reverse();
    }
    else{
      return this.outbox.reverse();
    }
  }

  //Table sorting algorithm
  sortData(sort: Sort) {
    //Sort inbox table
    if (this.inboxing){
      const data = this.inbox.slice();
      if (!sort.active || sort.direction === '') {
        this.inbox = data;
        return;
      }

      this.inbox = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'from': return compare(a.from, b.from, isAsc);
          case 'to': return compare(a.to, b.to, isAsc);
          case 'date': return compare(a.date, b.date, isAsc);
          default: return 0;
        }
      });
    }
    //Sort the outbox table
    else {
      const data = this.outbox.slice();
      if (!sort.active || sort.direction === '') {
        this.outbox = data;
        return;
      }

      this.outbox = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'from': return compare(a.from, b.from, isAsc);
          case 'to': return compare(a.to, b.to, isAsc);
          case 'date': return compare(a.date, b.date, isAsc);
          default: return 0;
        }
      });
    }
    function compare(a: string | number, b: string | number, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
