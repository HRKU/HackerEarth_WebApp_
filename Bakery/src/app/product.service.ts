/* tslint:disable */
import { Products } from './product.model';

import { Component, EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductServices {
  Home_products: Products[] = [];

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.Home_products.slice();
  }

  fetchData() {
    this.http
      .get<{ [key: string]: Products }>(
        'https://bakery-backend-h81u.onrender.com/api/products'
      )
      .pipe(
        map((responseData) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe((posts) => {
        console.log('array' + posts);

        this.Home_products = posts;
      });
  }
}
