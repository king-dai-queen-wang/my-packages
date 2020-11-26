import {TreeNode} from './tree-node.model';

export type TreeNodeKey = string | number;

export interface FlattenNode {
  parent: FlattenNode | null;
  children: FlattenNode[];
  pos: string;
  data: TreeNode;
  isStart: boolean[];
  isEnd: boolean[];
}

export interface TreeNodeOptions {
  title: string;
  key: string;
  icon?: string;
  isLeaf?: boolean;
  checked?: boolean;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  expanded?: boolean;
  children?: TreeNodeOptions[];

  [key: string]: any;
}

export interface FormatEmitEvent {
  eventName: string;
  node?: TreeNode | null;
  event?: MouseEvent | DragEvent | null;
  dragNode?: TreeNode;
  selectedKeys?: TreeNode[];
  checkedKeys?: TreeNode[];
  matchedKeys?: TreeNode[];
  nodes?: TreeNode[];
  keys?: string[];
}

export interface FormatBeforeDropEvent {
  dragNode: TreeNode;
  node: TreeNode;
  pos: number;
}

export interface TreeNodeBaseComponent {
  markForCheck(): void;
}
