import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerMainComponent} from "./customer-main/customer-main.component";

const routes: Routes = [
  {path:'', redirectTo:'/customers/main', pathMatch:'full'},
  {path:'main', component: CustomerMainComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
