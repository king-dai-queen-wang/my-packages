import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {StackComponent} from './stack/stack.component';
import {QueueComponent} from './queue/queue.component';
import {LinkedListComponent} from './linked-list/linked-list.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataStructureRoutingModule { }
