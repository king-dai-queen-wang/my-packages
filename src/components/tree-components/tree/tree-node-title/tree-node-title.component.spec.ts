import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeTitleComponent } from './tree-node-title.component';

describe('TreeNodeTitleComponent', () => {
  let component: TreeNodeTitleComponent;
  let fixture: ComponentFixture<TreeNodeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeNodeTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNodeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
