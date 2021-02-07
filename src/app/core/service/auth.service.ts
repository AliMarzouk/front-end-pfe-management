import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { User } from '../models/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import jwtDecode from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  path: string = environment.API_URL + 'authentication/'
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) {}

  login(email: string, password: string) {
    this.http.post<string>(this.path + 'login',{
      email,
      password
    }).subscribe(data => {
        const decoded_token: User = jwtDecode(data['access-token']);
        this.user.next(
          {... decoded_token,
            exp_date: new Date(decoded_token['exp']),
            token: data['access-token']
          });
        this.router.navigate(['/dashboard/welcome'])
      },error => {
        this.showNotification(
          'snackbar-danger',
          'Username and Password not valid !',
          'bottom',
          'center'
        );
        return false;
      }
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/authentication/signin'])
  }

  isLoggedIn() {
    return this.user.value !== null;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
