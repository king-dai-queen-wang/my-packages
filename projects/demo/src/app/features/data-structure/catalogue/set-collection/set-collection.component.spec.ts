import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCollectionComponent } from './set-collection.component';

describe('SetCollectionComponent', () => {
  let component: SetCollectionComponent;
  let fixture: ComponentFixture<SetCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
