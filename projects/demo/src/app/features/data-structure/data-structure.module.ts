import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStructureRoutingModule } from './data-structure-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { StackComponent } from './catalogue/stack/stack.component';
import { QueueComponent } from './catalogue/queue/queue.component';
import { LinkedListComponent } from './catalogue/linked-list/linked-list.component';
import { SetCollectionComponent } from './catalogue/set-collection/set-collection.component';
import { BinarySearchTreeComponent } from './catalogue/binary-search-tree/binary-search-tree.component';


@NgModule({
  declarations: [CatalogueComponent, StackComponent, QueueComponent, LinkedListComponent, SetCollectionComponent, BinarySearchTreeComponent],
  imports: [
    CommonModule,
    DataStructureRoutingModule
  ]
})
export class DataStructureModule { }
