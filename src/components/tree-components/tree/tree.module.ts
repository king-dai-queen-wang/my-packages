import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeIndentComponent } from './tree-indent/tree-indent.component';
import { TreeNodeSwitcherComponent } from './tree-node-switcher/tree-node-switcher.component';
import { TreeNodeTitleComponent } from './tree-node-title/tree-node-title.component';
import { TreeNodeCheckboxComponent } from './tree-node-checkbox/tree-node-checkbox.component';



@NgModule({
  declarations: [
    TreeNodeComponent,
    TreeIndentComponent,
    TreeNodeSwitcherComponent,
    TreeNodeTitleComponent,
    TreeNodeCheckboxComponent,],
  imports: [
    CommonModule
  ]
})
export class TreeModule { }
