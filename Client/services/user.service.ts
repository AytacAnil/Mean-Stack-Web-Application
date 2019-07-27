import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User'
import { Session } from "../models/Session";
import 'rxjs/add/operator/map';



@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private serverApi= 'http://localhost:3000';

  public getAllUsers():Observable<User[]> {
    let URI = this.serverApi + '/myApp/Users';
    return this.http.get(URI).map(res => <User[]>res["users"]);
  }

  public getAllUsernames():Observable<string[]> {
    let URI = this.serverApi + '/myApp/Users/usernames';
    return this.http.get(URI).map(res => <string[]>res["usernames"]);
  }

  public searchUsers(key: string):Observable<string[]> {
    let URI = this.serverApi + '/myApp/Users/search/' + key;
    return this.http.get(URI).map(res => <string[]>res["userList"]);
  }

  public getAllSessions():Observable<Session[]> {
    let URI = this.serverApi + '/myApp/Sessions';
    return this.http.get(URI).map(res => <Session[]>res["sessions"]);
  }

  public deleteUser(userId : string) {
    let URI = this.serverApi + '/myApp/Users/' + userId;
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, {headers});
  }

  public addUser(user: User): Observable<User>{
    let URI = this.serverApi + '/myApp/Users';
    let headers = new HttpHeaders;
    console.log(user);
    headers.append('Content-Type', 'application/json');
    return this.http.post<User>(URI, user,{headers: headers});
  }

  public updateUser(user: User): Observable<User>{
    let URI = this.serverApi + '/myApp/Users/' + user._id;
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.put<User>(URI, user, {headers: headers});
  }

  public login(username: String, password: String){
    let URI = this.serverApi + '/myApp/login';
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, {username, password},{headers});
  }

  public logout(){
    let URI = this.serverApi + '/myApp/logout';
    return this.http.post(URI, {});
  }
}

