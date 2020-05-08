import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyWorksComponent} from './my-works/my-works.component';
import {TetrisComponent} from './my-works/tetris/tetris.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'list'
}, {
  path: 'list',
  component: MyWorksComponent,
}, {
  path: 'tetris',
  component: TetrisComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorksRoutingModule { }
