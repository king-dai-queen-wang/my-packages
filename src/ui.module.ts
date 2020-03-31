import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WawaComponent} from './components/wawa/wawa.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import './styles.scss';

@NgModule({
  declarations: [WawaComponent, NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    WawaComponent,
    NavComponent
  ]
})
export class UiModule { }
