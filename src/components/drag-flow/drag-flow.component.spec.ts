import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragFlowComponent } from './drag-flow.component';

describe('DragFlowComponent', () => {
  let component: DragFlowComponent;
  let fixture: ComponentFixture<DragFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
