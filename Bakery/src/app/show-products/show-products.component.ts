/* tslint:disable */
import { Component, OnInit, ViewChild, ElementRef,EventEmitter, Output } from '@angular/core';
import { ProductServices } from '../product.service';
import { Products } from '../product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Category} from "../category.model";




@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
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
export class ShowProductsComponent implements OnInit {


  myCategory: any;
  id: number;
  Home_products : any;

  constructor( private route: ActivatedRoute,
    private http:HttpClient) { }

    ngOnInit() {
      let id12 = this.route.snapshot.paramMap.get('id2');
      console.log(id12);
            this.http.get("https://bakery-backend-api.herokuapp.com/api/category/"+id12).subscribe(cate=>
            {
              this.myCategory = cate;
            });


      let id1 = this.route.snapshot.paramMap.get('id2');



      this.http.get("https://bakery-backend-api.herokuapp.com/api/productCate/"+id1).subscribe(posts =>{
        console.log("array"+posts);

       this.Home_products =  posts;






     })

    ;
    }


}
