import { NgModule } from '@angular/core';
import {DirectiveModule} from './directive/directive.module';
import {ComponentsModule} from './components/components.module';
import { HostUrlPipe } from './pipe/host-url.pipe';

@NgModule({
  imports: [
    ComponentsModule,
    DirectiveModule,
  ],
  exports: [
    ComponentsModule,
    DirectiveModule,
    HostUrlPipe
  ],
  declarations: [HostUrlPipe]
})
export class UiModule { }
