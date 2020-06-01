import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H5StudyStartComponent } from './h5-study-start.component';

describe('H5StudyStartComponent', () => {
  let component: H5StudyStartComponent;
  let fixture: ComponentFixture<H5StudyStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H5StudyStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H5StudyStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
