import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { Session } from "../../models/Session";
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
import { Sort } from "@angular/material/sort"

@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {
  private sessionList: Session[] = [];

  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit() {
    this.loadSessions();
  }

  public loadSessions() {
    //Get all lists from server and update the lists property
    this.userServ.getAllSessions().subscribe(
      response => this.sessionList = response);
  }

  //Table Sorting algorithm
  sortData(sort: Sort) {
    const data = this.sessionList.slice();
    if (!sort.active || sort.direction === '') {
      this.sessionList = data;
      return;
    }

    this.sessionList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username': return compare(a.username, b.username, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'duration' : return compare(a.duration, b.duration, isAsc);
        case 'ip': return compare(a.ip, b.ip, isAsc);
        case 'browser': return compare(a.browser, b.browser, isAsc);
        default: return 0;
      }
    });
    function compare(a: string | number, b: string | number, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}

//Since login durations are 0 for proper sorting, it looks ugly, so we convert 0s to null here
@Pipe({ name: 'zeroValueFilter' })
export class ZeroValueFilter implements PipeTransform {
  transform(value: number) {
    if (value == 0){
      return null;
    }
    else{
      return value;
    }
  }
}
