/* tslint:disable */
import { Component, OnInit, ViewChild, ElementRef,EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
// import { Subscription } from 'rxjs';
import { Products } from '../product.model';
import { CartServices } from '../cart.service';
import { Cart } from '../cart.model';
// import { ProductNew } from '../productNew.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  Home_products : any;
  @ViewChild('ingre_qty') ingre_qty : ElementRef;

  constructor( private route: ActivatedRoute,
    private  router: Router,private http:HttpClient,private cartServi:CartServices) { }

    ngOnInit() {

      let id2 = this.route.snapshot.paramMap.get('id');



      this.http.get("https://bakery-backend-api.herokuapp.com/api/product/"+id2).subscribe(posts =>{
        console.log("array"+posts);

       this.Home_products =  posts;






     })

    ;

    }

    addTocart()
    {
      console.log(this.Home_products._id);
      cart :Cart;
      const qty = this.ingre_qty.nativeElement.value;

      let id = this.Home_products._id;
      let product_name = this.Home_products.ProductName;
      let product_count = qty;
      let product_image = this.Home_products.photoByPath;
      let product_price = this.Home_products.Cost;
      let product_total = qty * product_price;

      console.log(this.Home_products.name);
      console.log(qty);
      const cartItems = new Cart(this.Home_products._id,product_name,product_count,product_image,product_price,product_total);

      console.log(cartItems);
      this.cartServi.addCart(cartItems);
      this.router.navigateByUrl('/cart');
    }

}
