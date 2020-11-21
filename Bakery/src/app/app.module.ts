import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { RecipeStartComponent } from './recipe-list/recipe-start/recipe-start.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductServices } from './product.service';
import { CartComponent } from './cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CartServices } from './cart.service';
import { NewOrderServices } from './neworder.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    ShowProductsComponent,
    OrdersComponent,
    SearchComponent,
    AddCategoryComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

  ],
  providers: [ProductServices, CartServices, NewOrderServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
