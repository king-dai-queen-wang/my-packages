import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H5StudyListComponent } from './h5-study-list.component';

describe('H5StudyListComponent', () => {
  let component: H5StudyListComponent;
  let fixture: ComponentFixture<H5StudyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H5StudyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H5StudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
