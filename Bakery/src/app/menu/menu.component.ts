import { Component, OnInit } from '@angular/core';
import {Products} from '../product.model';
import {ProductServices} from '../product.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }
    .full {
      color: red;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: red;
    }
  `]

})
export class MenuComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  Home_products: Products[];

  constructor(private productServi: ProductServices, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{[key: string]: Products}>('http://localhost:3100/api/products')
    .pipe(map(responseData => {
      const postArray = [];
      for (const key in responseData)
      {
        if (responseData.hasOwnProperty(key))
          {
            postArray.push({...responseData[key], id: key});
          }
      }
      console.log(postArray);
      return postArray;
    })).subscribe(postArray => {
      this.Home_products = postArray;
    });
    this.Home_products = this.Home_products.sort((low, high) => low.Cost - high.Cost);
  }

    sort(event: any) {
    switch (event.target.value) {
      case 'Low':
        {
          this.Home_products = this.Home_products.sort((low, high) => low.Cost - high.Cost);
          break;
        }

      case 'High': {
        this.Home_products = this.Home_products.sort((low, high) => high.Cost - low.Cost);
        break;
      }
      case 'Rating':
        {
          this.Home_products = this.Home_products.sort((low, high) => high.rating - low.rating);
          break;
        }

      default: {
        this.Home_products = this.Home_products.sort((low, high) => low.Cost - high.Cost);
        break;
      }

    }
    return this.Home_products;

  }
}

