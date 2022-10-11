import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: BehaviorSubject<boolean | any> = new BehaviorSubject(null);

  baseUrl = 'http://127.0.0.1:8000';
  options = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'application',
      appId: environment.apiId,
      appSecret: environment.apiSecret,
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    // http.get(`${this.baseUrl}/getUser`).subscribe((res) => {
    //   const resp = JSON.parse(JSON.stringify(res));
    //   console.log(resp);
    //   if (resp.user) {
    //     this.currentUser.next(resp.user);
    //   } else {
    //     this.currentUser.next(false);
    //   }
    // });

    // http.get(`${this.baseUrl}/onAuthStateChange`).subscribe((res) => {
    //   const response = JSON.parse(JSON.stringify(res))
    //   console.log(response);
    //   console.log("Auth changed", response.event);
    //   console.log("Auth changed session", response.session);
    //   if (response.session) {
    //     this.currentUser.next(response.session.user)
    //   } else {
    //     this.currentUser.next(false);
    //   }
      
    // });
  }

  signUp(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  signIn(userData: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  signOut() {
    return this.http.get(`${this.baseUrl}/signout`)
    //   .subscribe(res => {
    //   console.log(res);
    //   this.router.navigate(['']);
    //   this.currentUser.next(false);
    // })
  }

  getUser() {
    return this.http.get('/getUser');
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  onAuthStateChange() {
    return this.http.get('/onAuthStateChange');
  }



  symblAuth() {
    return fetch('https://api.symbl.ai/oauth2/token:generate', this.options);
    // .then((response) => response.json())
    // .then((response) => {
    //   localStorage.setItem('accessToken', response.accessToken);
    //   // environment.access_token = response.accessToken;
    //   console.log(
    //     'Local Storage token: ',
    //     localStorage.getItem('accessToken')
    //   );
    // })
    // .catch((err) => console.error(err));
  }
}
