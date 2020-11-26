import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeCheckboxComponent } from './tree-node-checkbox.component';

describe('TreeNodeCheckboxComponent', () => {
  let component: TreeNodeCheckboxComponent;
  let fixture: ComponentFixture<TreeNodeCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeNodeCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNodeCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
