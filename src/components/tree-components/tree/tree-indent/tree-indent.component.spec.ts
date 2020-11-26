import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeIndentComponent } from './tree-indent.component';

describe('TreeIndentComponent', () => {
  let component: TreeIndentComponent;
  let fixture: ComponentFixture<TreeIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
