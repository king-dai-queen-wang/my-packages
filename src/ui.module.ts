import { NgModule } from '@angular/core';
import {DirectiveModule} from './directive/directive.module';
import {ComponentsModule} from './components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    DirectiveModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class UiModule { }
