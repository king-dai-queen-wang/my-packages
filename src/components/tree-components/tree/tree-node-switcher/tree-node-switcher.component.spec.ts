import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeSwitcherComponent } from './tree-node-switcher.component';

describe('TreeNodeSwitcherComponent', () => {
  let component: TreeNodeSwitcherComponent;
  let fixture: ComponentFixture<TreeNodeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeNodeSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNodeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
