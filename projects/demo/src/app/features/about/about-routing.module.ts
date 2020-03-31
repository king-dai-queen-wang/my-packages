import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComponentComponent} from '../component/component/component.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [{
  path: '',
  component: AboutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
