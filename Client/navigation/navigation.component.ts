import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private mockStatus = false;

  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit() {
    //Check if a token exists
    if (localStorage.getItem("authToken") == null){
      this.router.navigateByUrl('/myApp/login');
    }
    document.getElementById("greeter").innerHTML += localStorage.getItem("usernameToDisplay");
    this.mockStatus = localStorage.getItem("mockStatus") == "Admin";
  }

  public logout() {
    this.userServ.logout().subscribe();
    localStorage.removeItem("authToken");
  }
}
