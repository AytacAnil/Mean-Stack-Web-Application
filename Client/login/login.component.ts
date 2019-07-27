import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private wrong = false;

  constructor(private listServ: UserService, private router: Router, private titleService: Title) { }

  ngOnInit()
  {
    //Check the token
    if (localStorage.getItem("authToken") != null){
      this.router.navigateByUrl('myApp');
    }

    this.username = '';
    this.password = '';
    this.titleService.setTitle("Welcome to iMail!");
  }

  public onSubmit(){
    this.listServ.login(this.username, this.password).subscribe(
      response => {
        if(response["success"] == true){
          console.log(response);
          localStorage.setItem("authToken", response["token"]);
          localStorage.setItem("mockStatus", response["mockStatus"]);
          localStorage.setItem("usernameToDisplay", this.username);
          this.router.navigateByUrl("myApp");
        }
        else{
          this.wrong = true;
        }
      },
    );
  }

}
