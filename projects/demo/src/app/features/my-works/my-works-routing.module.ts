import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyWorksComponent} from './my-works/my-works.component';
import {TetrisComponent} from './my-works/tetris/local-teris/tetris.component';
import {RemoteTetrisComponent} from './my-works/tetris/remote-teris/remote-tetris.component';
import {DragDropDashboardComponent} from '../../../../../../src/components/drag-drop-dashboard/drag-drop-dashboard.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'list'
}, {
  path: 'list',
  component: MyWorksComponent,
}, {
  path: 'tetris',
  component: TetrisComponent
}, {
  path: 'remote-tetris',
  component: RemoteTetrisComponent
}, {
  path: 'drag-drop-dashboard',
  component: DragDropDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorksRoutingModule { }
