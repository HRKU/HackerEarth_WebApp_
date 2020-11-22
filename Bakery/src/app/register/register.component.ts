import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onCreatePost(postData: {
    Fullname: string; Email: string; Dateofbirth: Date;
    Mobile: number; Password: string; Address: string;
    City: string; })

  {
    console.log(postData);

    this.http.post('https://bakery-backend-api.herokuapp.com/api/signup',postData).subscribe(responseData => {
      console.log(responseData);
      alert("Welcome!! Baker, Account created Successfully.")
    })

  }
}
