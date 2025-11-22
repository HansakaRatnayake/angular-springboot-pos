import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderMainComponent} from "./order-main/order-main.component";

const routes: Routes = [
  {path:'', redirectTo:'/orders/main', pathMatch:'full'},
  {path:'main', component: OrderMainComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
