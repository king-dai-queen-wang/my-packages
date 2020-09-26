import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { H5PracticeRoutingModule } from './h5-practice-routing.module';
import { H5StudyStartComponent } from './h5-study-start/h5-study-start.component';
import { H5StudyListComponent } from './h5-study-list/h5-study-list.component';
import { H5StudyBoxComponent } from './h5-study-box/h5-study-box.component';
import {UiModule} from '../../../../../../src/ui.module';


@NgModule({
  declarations: [H5StudyStartComponent, H5StudyListComponent, H5StudyBoxComponent],
  imports: [
    CommonModule,
    H5PracticeRoutingModule,
    UiModule
  ]
})
export class H5PracticeModule { }
