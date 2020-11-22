import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'url';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onAddPost(postData: {
    name: string;
     })

  {
    // console.log(postData);

    this.http.post('https://bakery-backend-api.herokuapp.com/api/category/create',postData).subscribe(responseData => {
      console.log(responseData);
      alert("Welcome!! Baker, category created Successfully.")
    })

  }
}



