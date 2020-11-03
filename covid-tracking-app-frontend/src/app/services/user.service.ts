import { Injectable } from '@angular/core';
import { UserResponse, UsersResponse, User } from '../models/user'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static loggedUser: User;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public _handleError(error: HttpErrorResponse | any) {
    let data = {};
    data = {
      reason: error && error.error.reason ? error.error.reason : '',
      status: error.status

    };
    console.error(data);
    return throwError(error);
  }

  public createUser(user: User): Observable<any> {
    return this.httpClient
      .post(API_URL + `users`, user)
      .pipe(catchError(this._handleError))
  }

  public updateContactInfo(user: User): Observable<any> {
    return this.httpClient
      .put(API_URL + `users/${user.user_id}`, user)
      .pipe(catchError(this._handleError))

  }

  public getAllUsers(): Observable<UsersResponse> {
    return this.httpClient
    .get<UsersResponse>(API_URL + `users`)
    .pipe(catchError(this._handleError))
  }

  public getUserByIdOrEmail(id: string): Observable<UserResponse>{
    return this.httpClient
    .get<UserResponse>(API_URL + `users/` + id)
    .pipe(catchError(this._handleError))
  }
  
  public sendUserActivation(email:String): Observable<UserResponse>{
    let json = {
      "email": email
    }
    return this.httpClient.post<UserResponse>(API_URL + `account_activation` , json)
  }
  public login(email: String, password: String): Observable<UserResponse> {
    let json = {
      "email": email,
      "password": password
    }

    return this.httpClient
    .post<UserResponse>(API_URL + `login`, json)
  }

  public logout(): Observable<UserResponse> {
    UserService.loggedUser = null;
    
    let currentUserId = localStorage.getItem('currentUserId')
    localStorage.removeItem('currentUserId')
    console.log("User with id of " + currentUserId + " has been logged out")

    AppComponent.changeToLogin();

    return this.httpClient
    .get<UserResponse>(API_URL + `logout`)
  }
}