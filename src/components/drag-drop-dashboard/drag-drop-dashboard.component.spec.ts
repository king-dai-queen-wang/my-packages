import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropDashboardComponent } from './drag-drop-dashboard.component';

describe('DragDropDashboardComponent', () => {
  let component: DragDropDashboardComponent;
  let fixture: ComponentFixture<DragDropDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
