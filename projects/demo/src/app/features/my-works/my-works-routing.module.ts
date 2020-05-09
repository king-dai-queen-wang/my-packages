import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyWorksComponent} from './my-works/my-works.component';
import {TetrisComponent} from './my-works/tetris/local-teris/tetris.component';
import {RemoteTetrisComponent} from './my-works/tetris/remote-teris/remote-tetris.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'list'
}, {
  path: 'list',
  component: MyWorksComponent,
}, {
  path: 'tetris',
  component: TetrisComponent
},{
  path: 'remote-tetris',
  component: RemoteTetrisComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorksRoutingModule { }
