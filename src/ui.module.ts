import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WawaComponent} from './components/wawa/wawa.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [WawaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    WawaComponent
  ]
})
export class UiModule { }
