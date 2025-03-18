import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { Userlogin } from '../userlogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new BehaviorSubject<Userlogin>(null);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  loginClicked(form: NgForm) {
    const email = form.value.Email;
    const password = form.value.Password;

    const login = { Email: email, Password: password };

    alert(password);

    this.http
      .post('https://bakery-backend-h81u.onrender.com/api/signin', login)
      .subscribe((responseData) => {
        console.log(responseData);
        alert('Log in Successfull Baker!');
        this.router.navigate(['/main']);
      });
    form.reset();
  }

  private handleAuthentication(
    Email: string,
    userId: string,
    Fullname: string
  ) {
    const user = new Userlogin(Email, userId, Fullname);
    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user)); // option 1
    localStorage.setItem('user_email', Email); // option 2
    localStorage.setItem('user_name', Fullname); // option 3
    localStorage.setItem('user_id', userId); // otpion 4

    sessionStorage.setItem('user_name', name);
  }
}
