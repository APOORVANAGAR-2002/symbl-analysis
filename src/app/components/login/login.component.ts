import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  userSignIn() {
    console.log(this.userData);
    this.authService.signIn(this.userData).subscribe((res) => {
      var response = JSON.parse(JSON.stringify(res));
      console.log(response);
      if (response.error === null) {
        localStorage.setItem('accessToken', response.symbl.accessToken);
        console.log("Access Token", response.symbl.accessToken);
        this.toastr.success('Logged in successfully!');
        this.router.navigate(['home']);
      } else {
        this.toastr.error(response.error.message);
      }
    });
  }

  getUser() {
    this.authService.getUser().subscribe(res => {
      console.log(res);
    })
  }

  // login() {
  //   // this.authService.generateToken().subscribe((res) => {
  //   //   console.log("In login", res);
  //   // })
  //   this.authService
  //     .symblAuth()
  //     .then((response) => response.json())
  //     .then((response) => {
  //       localStorage.setItem('accessToken', response.accessToken);
  //       // environment.access_token = response.accessToken;
  //       if (localStorage.getItem('accessToken')) {
  //         alert('Signed in successfully');
  //         this.router.navigate(['home']);
  //         console.log(
  //           'Local Storage token: ',
  //           localStorage.getItem('accessToken')
  //         );
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }
}
