import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userSignUp() {
    console.log(this.userData);
    this.authService.signUp(this.userData).subscribe((res) => {
      var response = JSON.parse(JSON.stringify(res));
      console.log(response);
      if (response.error === null) {
        this.toastr.error(response.error.message);
      } else {
        this.toastr.success('Signed up successfully!');
        this.router.navigate(['login']);
      }
    });
  }
}
