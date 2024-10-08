import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShopingCartComponent } from './shop/shoping-cart/shoping-cart.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:"", component:WelcomeComponent},
  {path:"cart", component:ShopingCartComponent},
  {path:"shop", component:ShopComponent},
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
