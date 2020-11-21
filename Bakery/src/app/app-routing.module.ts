/* tslint:disable */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component'
import { ShowProductsComponent } from './show-products/show-products.component'
import { OrdersComponent } from './orders/orders.component'
import { SearchComponent } from './search/search.component'
import { AddCategoryComponent } from './add-category/add-category.component';
import {MenuComponent} from './menu/menu.component';


const routes: Routes = [
  {path:'', redirectTo: '/main', pathMatch: 'full' },
  {path:'main', component: HomeComponent},
  {path:'product-details/:id',component: ProductDetailsComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'ShowProducts/:id2',component:ShowProductsComponent},
  {path:'orders',component:OrdersComponent},
  {path:'search',component:SearchComponent},
  {path:'addCategory',component:AddCategoryComponent},
  {path:'Menu',component:MenuComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
