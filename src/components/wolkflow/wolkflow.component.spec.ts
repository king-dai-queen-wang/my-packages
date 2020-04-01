import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WolkflowComponent } from './wolkflow.component';

describe('WolkflowComponent', () => {
  let component: WolkflowComponent;
  let fixture: ComponentFixture<WolkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WolkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WolkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
