import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWorksRoutingModule } from './my-works-routing.module';
import { MyWorksComponent } from './my-works/my-works.component';
import { TetrisComponent } from './my-works/tetris/local-teris/tetris.component';
import {RemoteTetrisComponent} from './my-works/tetris/remote-teris/remote-tetris.component';
import {UiModule} from '../../../../../../public_api';


@NgModule({
  declarations: [MyWorksComponent, TetrisComponent, RemoteTetrisComponent],
  imports: [
    CommonModule,
    MyWorksRoutingModule,
    UiModule
  ]
})
export class MyWorksModule { }
