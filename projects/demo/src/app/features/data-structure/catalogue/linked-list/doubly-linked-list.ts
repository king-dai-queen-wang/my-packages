export interface IDoubleLinkedList {
  head;
  tail;
  length;
  append: (element: any) => void;
  insert: (position: number, element: any) => void;
  get: (position: number) => any;
  indexOf: (element) => number;
  update: (position: number, element: any) => {};
  removeAt: (position: number) => any;
  remove: (element: any) => {};
  isEmpty: () => boolean;
  size: () => number;
  toString: () => string;
  forwardString: () => string;
  backwardString: () => string;
  getHead: () => any;
  getTail: () => any;
}
// 双向链表
export function DoublyLinkedList() {
   this.tail = null;
   this.head = null;
   this.length = 0;
   // 内部类
   function Node(data) {
     this.data = data;
     this.previous = null;
     this.next = null;
   }
   DoublyLinkedList.prototype.append = function(element) {
     const newNode = new Node(element);
     if (this.length === 0) {
       this.head = newNode;
       this.tail = newNode;
     } else {
       // 把当前tail 赋值给newNode的prev，
       newNode.previous = this.tail;
       // newNode赋值给 当前的tail的next
       this.tail.next = newNode;
       // 将newNode 指定为当前的tail
       this.tail = newNode;
     }
     this.length += 1;
   };

   DoublyLinkedList.prototype.insert = function(position, element) {
   //  1.越界判断
     if (position < 0 || position > this.length) { return false; }
   //  2.根据data创建节点
     const newNode = new Node(element);
     // 3. 判断列表是否为空
     if (this.length === 0) {
       this.head = newNode;
       this.tail = newNode;
       this.length += 1;
       return;
     }
     // 4. 判断position是否为0
     if (position === 0) {
       this.head.previous = newNode;
       newNode.next = this.head;
       this.head = newNode;
       this.length += 1;
       return;
     }
     // 5. 判断插入的位置是否为最后一个
     if (this.length === position) {
       this.append(element);
       return;
     }
     // 6. 插入中间的节点
     let index = 0;
     let currentNode = this.head;
     // 找到目标位置
     while (index++ < position) {
       currentNode = currentNode.next;
     }
     // 6.1 插到目标位置之前
     currentNode.previous = newNode.previous;
     newNode.next = currentNode;

     currentNode.previous.next = newNode;
     currentNode.previous = newNode;

   //  7. length + 1
     this.length += 1;
   };

   DoublyLinkedList.prototype.get = function(position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) { return null; }
    //  2. 获取元素
    let current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  };

   DoublyLinkedList.prototype.indexOf = function(element) {
     let current = this.head;
     let index = 0;
     while (current && current.data !== element) {
       index++;
       current = current.next;
     }
     // 若没有找到
     if (current === null) {
       return -1;
     } else {
       return index;
     }
   };

   DoublyLinkedList.prototype.update = function(position, element) {
    if (position < 0 || position >= this.length) { return false; }
  //   寻找正确节点
    let current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.data = element;
    return true;
  };

   DoublyLinkedList.prototype.removeAt = function(position) {
     if (position < 0 || position >= this.length ) { return null; }
     let current = this.head;
   //  1. 判断只有一个节点的时候
     if (this.length === 1) {
       this.head = null;
       this.tail = null;
       this.length -= 1;
       return current;
     }
   //  2. 有多个节点的时候
   //  2.1 删除第一个节点
     if (position === 0) {
       this.head.next.previous = null;
       this.head = this.head.next;
       this.length -= 1;
       return current;
     }
     // 2.2 删除最后一个节点
     if (position === this.length - 1) {
       current = this.tail;
       this.tail = this.tail.previous;
       this.tail.next = null;
       this.length -= 1;
       // 返回删除的最后一个节点
       return current;
     }
   //  2.3 删除中间节点
     if (position >= 0 && position <= this.length - 1) {
       let index = 0;
       while (index++ < position) {
         current = current.next;
       }
       current.previous.next = current.next;
       current.next.previous = current.previous;
       this.length -= 1;
       // 返回删除的节点
       return current;
     }

   };

   DoublyLinkedList.prototype.remove = function(element) {
     // 1.获取当前要删除的节点位置
     const index = this.indexOf(element);
   //   2。根据index 删除节点,并且返回删除的节点
     return this.removeAt(index);
   };
   DoublyLinkedList.prototype.isEmpty = function() {
     return this.length === 0;
   };
   DoublyLinkedList.prototype.size = function() {
     return this.length;
   };
   // 获取头
   DoublyLinkedList.prototype.getHead = function() {
     return this.head.data;
   };
   // 获取尾
   DoublyLinkedList.prototype.getTail = function() {
     return this.tail.data;
   };
   // 链表转str
   DoublyLinkedList.prototype.toString = function() {
     return this.backwardString();
   };
   // 从后往前转str
   DoublyLinkedList.prototype.forwardString = function() {
     let current = this.tail;
     let resultStr =  '';

     while (current) {
       resultStr += current.data + '';
       current = current.previous;
     }
     return resultStr;
   };
   // 从前往后转str
   DoublyLinkedList.prototype.backwardString = function() {
     let current = this.head;
     let resultStr =  '';

     while (current) {
       resultStr += current.data + '';
       current = current.next;
     }
     return resultStr;
   };
 }

