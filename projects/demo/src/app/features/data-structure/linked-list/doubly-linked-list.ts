 // 双向链表
 export function DoublyLinkedList() {
   this.tail = null;
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
       newNode.prev = this.tail;
       this.tail.next = newNode;
       this.tail = newNode;
     }
     this.length += 1;
   };
 }

