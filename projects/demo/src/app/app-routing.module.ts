import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'my-works',
    loadChildren: './features/my-works/my-works.module#MyWorksModule'
  },
  {
    path: 'component',
    loadChildren: './features/component/component.module#ComponentModule'
  },
  {
    path: 'about',
    loadChildren: './features/about/about.module#AboutModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
