import { Routes } from '@angular/router';
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {LoginComponent} from "./view/login/login.component";
import {authGuard} from "./core/guard/auth.guard";
import {SignupComponent} from "./view/signup/signup.component";
import {NotFoundComponent} from "./view/not-found/not-found.component";

export const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:"full"},
  {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'customers', loadChildren:()=>import('./module/customer/customer.module').then(m=>m.CustomerModule)},
  {path:'products', loadChildren:()=>import('./module/product/product.module').then(m=>m.ProductModule)},
  {path:'orders', loadChildren:()=>import('./module/order/order.module').then(m=>m.OrderModule)},
  {path:'**', component:NotFoundComponent}
];
