import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {UiModule} from '../../../../../../src/ui.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxEchartsModule,
    UiModule
  ]
})
export class HomeModule { }
