import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWorksRoutingModule } from './my-works-routing.module';
import { MyWorksComponent } from './my-works/my-works.component';
import { TetrisComponent } from './my-works/tetris/tetris.component';


@NgModule({
  declarations: [MyWorksComponent, TetrisComponent],
  imports: [
    CommonModule,
    MyWorksRoutingModule
  ]
})
export class MyWorksModule { }
