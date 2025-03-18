import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart.model';
import { CartServices } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.model';
import { User } from '../user.model';

import { from } from 'rxjs';
import { NewOrderServices } from '../neworder.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartSer: CartServices,
    private http: HttpClient,
    private newOrde: NewOrderServices
  ) {}

  cart: Cart[];
  order: Order[];
  user: User;
  final_total: number = 0;

  ngOnInit(): void {
    //console.log( this.cartSer.getcart());
    this.cart = this.cartSer.getcart();

    for (let i of this.cart) {
      this.final_total = this.final_total + i.product_total;
    }
  }
  deleteCart(index: number) {
    this.cartSer.deleteCart(index);
    this.cart = this.cartSer.getcart();

    this.final_total = 0;
    for (let i of this.cart) {
      this.final_total = this.final_total + i.product_total;
    }
  }

  placeOrder2() {
    for (let i of this.cart) {
      const items = new Order(
        i.product_id,
        i.product_name,
        i.product_count,
        i.product_price
      );
      this.newOrde.addToOrder(items);
    }

    let products2: Order[];

    products2 = this.newOrde.getOrder();
    let amount = this.final_total;
    // let  city = this.user.City;
    // let  address = this.user.address;
    // let    user = this.user._id;
    let address2 = 'Pune';
    let user = '5ef1ca02243b8d1fdcfa99e7';

    let postData = {
      products: products2,
      amount: amount,
      address: address2,
      user: user,
    };
    // console.log(products2);

    // console.log(postData);

    this.http
      .post(
        'https://bakery-backend-h81u.onrender.com/api/order/create',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);

        alert('Order is created !!!!');
      });
  }
}
