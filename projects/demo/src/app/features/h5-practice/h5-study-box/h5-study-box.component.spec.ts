import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H5StudyBoxComponent } from './h5-study-box.component';

describe('H5StudyBoxComponent', () => {
  let component: H5StudyBoxComponent;
  let fixture: ComponentFixture<H5StudyBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H5StudyBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H5StudyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
