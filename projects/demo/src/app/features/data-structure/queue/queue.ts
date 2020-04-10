export interface IQueue {
  // 向队列尾部添加一个或多个新的项
  enqueue: (element: any, priority?: number) => void;
  // 移除队列的第一个（即排在队列最前面的项）,并返回被移除的元素
  dequeue: () => any;
  // 返回队列中的第一个元素（最先被添加也是最先被移除的元素，）队列不做任何改变（不移除元素，只返回元素信息）
  front: () => any;
  // 判断是否包含元素
  isEmpty: () => boolean;
  // 返回队列的元素个数
  size: () => number;
  toString: () => string;
}
export class Queue implements IQueue {
  private readonly items: any[];
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }

  toString() {
    let resSting = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.items.length; i++) {
      resSting += this.items[i] + '';
    }
    return resSting;
  }

}
