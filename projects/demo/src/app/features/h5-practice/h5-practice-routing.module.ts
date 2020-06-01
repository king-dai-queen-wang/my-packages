import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {H5StudyStartComponent} from './h5-study-start/h5-study-start.component';
import {H5StudyListComponent} from './h5-study-list/h5-study-list.component';
import {H5StudyBoxComponent} from './h5-study-box/h5-study-box.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    children: [
      {
        path: '',
        component: H5StudyListComponent
      },
      {
        path: 'start',
        component: H5StudyStartComponent
      },
      {
        path: 'box',
        component: H5StudyBoxComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class H5PracticeRoutingModule { }
