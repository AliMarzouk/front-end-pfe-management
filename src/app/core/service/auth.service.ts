import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
  users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      firstName: 'Sarah',
      lastName: 'Smith',
    },
  ];

  constructor() {}

  login(username: string, password: string) {
    const user = this.users.find(
      (x) => x.username === username && x.password === password
    );

    if (user) {
      localStorage.setItem('STATE', 'true');
      this.isLogin = true;
    } else {
      localStorage.setItem('STATE', 'false');
      this.isLogin = false;
    }
    return of({ success: this.isLogin });
  }

  logout() {
    this.isLogin = false;
    localStorage.setItem('STATE', 'false');
    return of({ success: this.isLogin });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }
}
