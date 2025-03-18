/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { Products } from '../product.model';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  myCategory: Category[];
  Home_products: Products[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ [key: string]: Category }>(
        'https://bakery-backend-h81u.onrender.com/api/categories'
      )
      .pipe(
        map((responseData) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          console.log(postArray);
          return postArray;
        })
      )
      .subscribe((postArray) => {
        this.myCategory = postArray;
      });

    // Second api call
    this.http
      .get<{ [key: string]: Products }>(
        'https://bakery-backend-h81u.onrender.com/api/products'
      )
      .pipe(
        map((responseData) => {
          const SearchArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              SearchArray.push({ ...responseData[key], id: key });
            }
          }
          console.log(SearchArray);
          return SearchArray;
        })
      )
      .subscribe((SearchArray) => {
        this.Home_products = SearchArray;
      });
  }
}
