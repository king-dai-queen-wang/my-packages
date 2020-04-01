import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UiModule} from '../../../../src/ui.module';
import {HomeModule} from './features/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UiModule,
    BrowserModule,
    HomeModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
