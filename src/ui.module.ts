import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WawaComponent} from './components/wawa/wawa.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { WolkflowComponent } from './components/wolkflow/wolkflow.component';
import { DragFlowComponent } from './components/drag-flow/drag-flow.component';

@NgModule({
  declarations: [WawaComponent, NavComponent, WolkflowComponent, DragFlowComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxEchartsModule,
    HttpClientModule
  ],
  exports: [
    WawaComponent,
    NavComponent,
    DragFlowComponent,
    WolkflowComponent
  ]
})
export class UiModule { }
