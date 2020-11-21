/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Products } from '../product.model';

import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Category} from "../category.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myCategory : Category[];
  Home_products : Products[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
        this.http.get<{[key:string]:Category}>("http://localhost:3100/api/categories")
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
      this.myCategory = postArray;
    });

     // Second api call
     this.http.get<{[key:string]:Products}>("http://localhost:3100/api/products")
     .pipe(map(responseData =>{
       const SearchArray =[];
       for (const key in responseData)
       {
         if(responseData.hasOwnProperty(key))
           {
             SearchArray.push({...responseData[key],id:key})
           }
       }
       console.log(SearchArray);
       return SearchArray;
     })).subscribe(SearchArray =>{
       this.Home_products = SearchArray;
     })
  }


}
