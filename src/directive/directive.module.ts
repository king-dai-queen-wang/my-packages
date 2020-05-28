import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDirective} from './drag.directive';
import {DropDirective} from './drop.directive';

@NgModule({
  declarations: [
    DragDirective,
    DropDirective,
  ],
  providers: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDirective,
    DropDirective,
  ]
})
export class DirectiveModule { }
