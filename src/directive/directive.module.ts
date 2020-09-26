import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDirective} from './drag.directive';
import {DropDirective} from './drop.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  declarations: [
    DragDirective,
    DropDirective,
    TooltipDirective,
  ],
  providers: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDirective,
    DropDirective,
    TooltipDirective,
  ]
})
export class DirectiveModule { }
