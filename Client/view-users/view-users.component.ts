import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {AddUserComponent} from "../add-user/add-user.component";
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort"


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
  private users: User[] = [];
  private feedback: string;
  //displayedColumns: string[] = ['username', 'name', 'surname', 'gender', 'birthday', 'mail'];

  @ViewChild(AddUserComponent, {static: false})
  private addUserComp: AddUserComponent;

  constructor(private userServ: UserService, private router: Router) {
  }

  ngOnInit()
  {
    //Load all list on init
    this.loadUsers();
    this.feedback = '';
  }

  public loadUsers() {
    //Get all lists from server and update the lists property
    this.userServ.getAllUsers().subscribe(
      response => this.users = response);
  }

  //deleteList. The deleted list is being filtered out using the .filter method
  public deleteUser(user: User) {
    this.userServ.deleteUser(user._id).subscribe(
      response =>  {
        if (response["success"]){
          this.users = this.users.filter(users => users !== user);
          this.feedback = "Delete successful!"
        }
        else{
          this.feedback = 'User could not deleted'
        }
        },
      );
  }

  public onAddUser(newUser: User) {
    this.users = this.users.concat(newUser);
  }

  public updateUser(user: User) {
    //Call to add user component
    document.getElementById("modalTrigger").click();
    this.addUserComp.switchToUpdate(user);
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.users = data;
      return;
    }

    this.users = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username': return compare(a.username, b.username, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        case 'birthday': return compare(a.birthday, b.birthday, isAsc);
        case 'mail': return compare(a.mail, b.mail, isAsc);
        default: return 0;
      }
    });
    function compare(a: string, b: string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}







