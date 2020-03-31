import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyWorksComponent} from './my-works/my-works.component';


const routes: Routes = [{
  path: '',
  component: MyWorksComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorksRoutingModule { }
