import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WawaComponent } from './wawa.component';

describe('WawaComponent', () => {
  let component: WawaComponent;
  let fixture: ComponentFixture<WawaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WawaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
