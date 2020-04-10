// https://www.bilibili.com/video/BV194411Q7hM?p=24
// 单项链表
function LinkedList() {
  // 封装链表类，节点类
  function Node(data) {
      this.data = data;
      this.next = null;
    }
  this.head = null;
  this.length = 0;

  // 向链表尾部添元素
  LinkedList.prototype.append = function(element) {
    const newNode = new Node(element);
    // 1.判断是否为第一个节点
    if (this.length === 0) {
      this.head = newNode;
    } else {
      let current = this.head;
      // 2.若current.next有值的话则将 current.next 赋给current；直到找到最后一个next为空的node
      while (current.next) {
        current = current.next;
      }
      // 3.让最后节点的next 指向newNode
      current.next = newNode;
    }
    //   4.添加节点，长度增加
    this.length += 1;
  };
// 向列表的特定位置添加新的项
  LinkedList.prototype.insert = function(position, element) {
    // 1.越界判断
    if (position < 0 || position > this.length) { return false; }
    // 2. 根据data创建newNode
    const newNode = new Node(element);
    if (position === 0) {
      // 当插入节点位置0的时候
      newNode.next = this.head.next;
      this.head.next = newNode;
    } else {
      // 若为任意position
      let index = 0;
      let current = this.head;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      previous.next = newNode;

    }
  };
// 获取对应位置的元素
  LinkedList.prototype.get = function(position) {
  //  1. 越界判断
    if (position < 0 || position >= this.length) {
      return null;
    }
  //   2.获取对应的data
    let current = this.head;
    let index = 0;
    // while 循环之后index 在+ 1
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  };
// 返回元素在列表中的索引，如果列表没有该元素则返回-1
  LinkedList.prototype.indexOf = function(element) {
    let current = this.head;
    let index = 0;
    while (element !== current.data) {
      current = current.next;
      if (current === null) {
        index = -1;
        break;
      } else {
        index += 1;
      }
    }
    return index;
  };
// 修改某个位置的元素
  LinkedList.prototype.update = function(position, element) {
  //   1 越界判断
    if (position < 0 || position >= this.length) { return false; }
  //   2 查找正确节点
    let  current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.data  =  element;
    return true;
  };
// 从列表中移除特定位置移除一项
  LinkedList.prototype.removeAt = function(position) {
    let current = this.head;
//   1 越界判断
    if (position < 0 || position >= this.length) { return null; }
  //  2. 判断是否删除的是第一个节点
    if (position === 0) {
      this.head = this.head.next;
    } else {
      let index = 0;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      // 前一个节点的next指向current的next
      previous.next = current.next;
    }
    this.length -= 1;
    return current;
  };

// 从列表中移除一项
  LinkedList.prototype.remove = function(element) {
    const position = this.indexOf(element);
    return this.removeAt(position);
  };

  LinkedList.prototype.isEmpty = function() {
    return this.length === 0;
  };

  LinkedList.prototype.size = function() {
    return this.length;
  };
// 由于列表项使用了node类，就需要继承自js对象的toString方法，让其只输出元素的值
  LinkedList.prototype.toString = function() {
    let resStr = '';
    let current = this.head;
    // 循环获取每一个节点
    while (current) {
      resStr += current.data + '->';
      current = current.next;
    }
    return resStr;
  };
}


export {LinkedList};
