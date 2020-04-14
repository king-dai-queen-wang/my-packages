export interface INode {
  key: any;
  value: any;
  left: INode;
  right: INode;
}
export interface IBinarySearchTree {
  root: INode;
  insert: (key, value) => void;
  search: (key: any) => any;

  // 先序遍历
  // 1.访问根节节点
  // 2.先序遍历其左子树
  // 3. 先序遍历其右子树
  preOrderTraverse: (cb: () => void) => any;
  // 中序遍历
  // 1. 先序遍历其左子树
  // 2. 访问根节节点
  // 3. 先序遍历其右子树
  middleOrderTraverse: (cb: () => void) => any;
  // 后序遍历
  // 中序遍历
  // 1. 先序遍历其左子树
  // 2. 先序遍历其右子树
  // 3. 访问根节节点
  postOrderTraverse: (cb: () => void) => any;
  // 树的最左边节点
  min: () => any;
  // 树的最右边的节点
  max: () => any;
  // 1.先找到要删除的节点，若没有找到，不需要删除
  // 2. 找到要删除节点
    // 2.1 删除叶子节点
    // 2.2 删除只有一个子节点的节点
    // 2.3 删除有两个子节点的节点
  remove: (key: any) => boolean;
}
export class NodeModel implements INode {
  key = null;
  value = null;
  left = null;
  right = null;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
export class BinarySearchTreeModel implements IBinarySearchTree {
  root: INode = null;
  // 外部调用的方法
  insert(key, value): void {
    const newNode = new NodeModel(key, value);
    if (this.root === null) {
      this.root = newNode;
      return;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  max(): any {
    let node = this.root;
    let key = null;
    while (node.right !== null) {
      key = node.key;
      node = node.right;
    }
    return key;
  }
  min(): any {
    let node = this.root;
    let key = null;
    while (node.left !== null) {
      key = node.key;
      node = node.left;
    }
    return key;
  }

  preOrderTraverse(cb: (key?: any) => void): any {
    return this.preOrderTraversalNode(this.root, cb);
  }
  middleOrderTraverse(cb: (key?: any) => void): any {
    return this.middleOrderTraverseNode(this.root, cb);
  }

  postOrderTraverse(cb: (key?: any) => void): any {
    return this.postOrderTraverseNode(this.root, cb);
  }
  remove(key: any): boolean {
  //  1.寻找要删除的节点
    let current: INode = this.root;
  //  定义变量，保存信息
    let parent: INode = null;
    // 当前节点是相对于父节点的左侧还是右侧
    let isLeftChild: boolean = true;
  //   1.2 开始寻找删除的节点
    while (current.key !== key) {
      parent = current;
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
    //   若一直找到了叶子节点，依然没有找到
      if ( current === null ) {
        return false;
      }
    }
  //  2.找到了current.key === key
    //  2.1 删除的节点是叶子节点（没有子节点）
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.right === null) {
      //  2.2 删除的节点只有一个左侧子节点
      if (current === this.root) { // 若当前要删除的节点是根节点的话
        this.root = current.left;
      } else if (isLeftChild) { // 若相对于父节点是左侧的话
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left === null) {
      //  2.2 删除的节点只有一个右侧子节点
      if (current === this.root) { // 若当前要删除的节点是根节点的话
        this.root = current.right;
      } else if (isLeftChild) { // 若相对于父节点是左侧的话
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else {//  2.3 删除的节点有两个子节点
      // 获取后继节点
      const successor: INode = this.getSuccessor(current);
      // 判断是否为根节点
      if (current === this.root) {
        this.root = successor;
      } else if (isLeftChild ) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      // 将删除的节点的左子树 = current.left
      successor.left = current.left;
    }
  }
  search(key: any): any {
    return this.searchNode(this.root, key);
  }

  // 内部插入节点的方法
  private insertNode(node: INode, newNode: INode): void {
    // 向左插入
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
        return;
      }
      if (node.left !== null) {
        this.insertNode(node.left, newNode);
        return;
      }
    } else {
      //  向右插入
      if (node.right === null) {
        node.right = newNode;
        return;
      }
      if (node.right !== null) {
        this.insertNode(node.right, newNode);
        return;
      }
    }
  }

  private preOrderTraversalNode(node: INode, cb) {
    if (node !== null) {
      // 1.处理经过的节点
      cb(node.key);
      // 2.处理经过节点的左子节点
      this.preOrderTraversalNode(node.left, cb);
      // 3. 处理经过节点的右节点
      this.preOrderTraversalNode(node.right, cb);
    }
  }

  private middleOrderTraverseNode(node: INode, cb) {
    if (node !== null) {
      // 1.处理经过节点的左子节点
      this.middleOrderTraverseNode(node.left, cb);
      // 2.处理经过的节点
      cb(node.key);
      // 3. 处理经过节点的右节点
      this.middleOrderTraverseNode(node.right, cb);
    }
  }

  private postOrderTraverseNode(node: INode, cb) {
    if (node !== null) {
      // 1.处理经过节点的左子节点
      this.postOrderTraverseNode(node.left, cb);
      // 2. 处理经过节点的右节点
      this.postOrderTraverseNode(node.right, cb);
      // 3.处理经过的节点
      cb(node.key);
    }
  }

  private searchNode(node: INode, key: any) {
    if (node === null) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    if (node.key < key) {
      return this.searchNode(node.right, key);
    }
    if (node.key > key) {
      return this.searchNode(node.left, key);
    }
  }

  private getSuccessor(deleteNode: INode): INode {
    let successor: INode = deleteNode;
    let successorParent: INode = deleteNode.right;
    let current: INode = deleteNode.right;
    while (current !== null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }
    // 判断寻找到的后继节点是否直接就是deleteNode的right的节点
    if (successor !== deleteNode.right) {
      successorParent.left = successor.right;
      successor.right = deleteNode.right;
    }
    return successor;
  }
}
