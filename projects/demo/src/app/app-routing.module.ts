import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'my-works',
    loadChildren: () => import('./features/my-works/my-works.module').then(m => m.MyWorksModule)
  },
  {
    path: 'component',
    loadChildren: () => import('./features/component/component.module').then(m => m.ComponentModule)
  },
  {
    path: 'h5-practice',
    loadChildren: () => import('./features/h5-practice/h5-practice.module').then(m => m.H5PracticeModule)
  },
  {
    path: 'data-structure',
    loadChildren: () => import('./features/data-structure/data-structure.module').then(m => m.DataStructureModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
