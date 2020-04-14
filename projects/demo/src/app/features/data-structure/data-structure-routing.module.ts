import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {StackComponent} from './catalogue/stack/stack.component';
import {QueueComponent} from './catalogue/queue/queue.component';
import {LinkedListComponent} from './catalogue/linked-list/linked-list.component';
import {SetCollectionComponent} from './catalogue/set-collection/set-collection.component';
import {BinarySearchTreeComponent} from './catalogue/binary-search-tree/binary-search-tree.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueComponent,
    children: [
      {
        path: 'stack',
        component: StackComponent
      },
      {
        path: 'queue',
        component: QueueComponent
      },
      {
        path: 'linked-list',
        component: LinkedListComponent
      },
      {
        path: 'set-collection',
        component: SetCollectionComponent
      },
      {
        path: 'binary-search-tree',
        component: BinarySearchTreeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataStructureRoutingModule { }
