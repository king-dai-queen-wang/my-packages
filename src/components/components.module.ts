import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WawaComponent} from './wawa/wawa.component';
import {NavComponent} from './nav/nav.component';
import {WolkflowComponent} from './wolkflow/wolkflow.component';
import {DragFlowComponent} from './drag-flow/drag-flow.component';
import {DragDropDashboardComponent} from './drag-drop-dashboard/drag-drop-dashboard.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';
import {HttpClientModule} from '@angular/common/http';
import {DirectiveModule} from '../directive/directive.module';
import { TooltipComponent } from './tooltip/tooltip.component';



@NgModule({
  declarations: [WawaComponent, NavComponent, WolkflowComponent,
    DragFlowComponent, DragDropDashboardComponent, TooltipComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxEchartsModule,
    DirectiveModule,
    HttpClientModule,
  ],
  exports: [
    WawaComponent,
    NavComponent,
    DragFlowComponent,
    WolkflowComponent,
    DragDropDashboardComponent,
  ]
})
export class ComponentsModule { }
