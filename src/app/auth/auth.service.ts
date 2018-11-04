import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { LcsData } from './auth-data.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string; // a property
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }/*send a http request*/
  getToken() {
    return this.token;
  }
  getIsAuth() {
    if(JSON.parse(localStorage.getItem('currentUser')).token) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
    else {
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
    }
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('/api/user/signup', authData)
      .subscribe(response => {
        this.router.navigate(['/login']);
      });
  }

  // lcs(inputmsg1: string, inputmsg2: string, result: string) {

  // const lcsData: LcsData = { inputmsg1: inputmsg1 , inputmsg2: inputmsg2, result: result};
  // this.http.post('/api/user/signup', lcsData)
  //       .subscribe(response => {
  //         console.log(response);
  //       });
  // }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number }>('/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const data = {
            user: response['user'],
            token: response['token'],
          };
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/create']);
        }
      });

  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    this.authStatusListener.next(false);
    // clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }
}

