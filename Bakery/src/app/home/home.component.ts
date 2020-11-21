import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../product.service';
import { Products } from '../product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Home_products : Products[];

  constructor(private productServi :ProductServices,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<{[key:string]:Products}>("http://localhost:3100/api/products")
    .pipe(map(responseData =>{
      const postArray =[];
      for (const key in responseData)
      {
        if(responseData.hasOwnProperty(key))
          {
            postArray.push({...responseData[key],id:key})
          }
      }
      console.log(postArray);
      return postArray;
    })).subscribe(postArray =>{
      this.Home_products = postArray;
    })
  }

}
