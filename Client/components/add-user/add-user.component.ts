import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  private newUser : User;
  private updating = false;
  public feedback: string = '';
  date = new FormControl(new Date());

  @Output() addUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private listServ: UserService) { }

  ngOnInit() {
    this.clearUser();
    this.feedback = '';
  }

  public onSubmit(){
    if (!this.updating){
      this.listServ.addUser(this.newUser).subscribe(
        response => {
          if(response["success"] == true){
            this.newUser._id = response["newId"];
            this.addUser.emit(this.newUser);
            this.feedback = 'User created successfully!';
            this.clearUser();
          }
          else{
            this.feedback = 'User could not created';
          }
        },
      );
    }
    else {
      this.listServ.updateUser(this.newUser).subscribe(
        response => {
          if(response["success"] == true){
            this.feedback = 'User updated successfully!';
          }
          else{
            this.feedback = 'User could not updated';
          }
        },
      );
    }
  }
  public switchToUpdate(user: User){
    this.updating = true;
    this.newUser = user;
    this.feedback = '';
  }
  public switchToCreate(){
    this.updating = false;
    this.clearUser();
    this.feedback = '';
  }

  private clearUser(){
    this.newUser = {
      username: '',
      password: '',
      name: '',
      surname: '',
      gender: '',
      birthday: '',
      mail: '',
      status: ''
    };
  }
}


