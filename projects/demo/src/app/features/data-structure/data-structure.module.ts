import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStructureRoutingModule } from './data-structure-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { StackComponent } from './stack/stack.component';
import { QueueComponent } from './queue/queue.component';


@NgModule({
  declarations: [CatalogueComponent, StackComponent, QueueComponent],
  imports: [
    CommonModule,
    DataStructureRoutingModule
  ]
})
export class DataStructureModule { }
