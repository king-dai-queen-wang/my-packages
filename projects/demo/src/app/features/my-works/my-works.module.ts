import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWorksRoutingModule } from './my-works-routing.module';
import { MyWorksComponent } from './my-works/my-works.component';


@NgModule({
  declarations: [MyWorksComponent],
  imports: [
    CommonModule,
    MyWorksRoutingModule
  ]
})
export class MyWorksModule { }
