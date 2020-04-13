// 优先级队列 priority越小越优先
import {Queue} from './queue';

function PriorityQueue() {

  // 继承Queue
  // Queue.call(this);
  // 继承结束
  this.items = [];
  // 在PriorityQueue类里面在创建QueueElement类（类似内部类）
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }
  // 外部传入element, priority,内部创建对象，内部进行封装
  // @ts-ignore
  PriorityQueue.prototype.enqueue = function(element, priority) {
  //  1.创建QueueElement对象
    const queueElement = new QueueElement(element, priority);
  //  2. 判断队列是否为空
    if (this.items.length === 0) {
      this.items.push(queueElement);
    } else {
      // 是否添加的flag
      let addedFlag = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > queueElement.priority) {
          this.items.splice(i, 0, queueElement);
          // 添加了，并且退出循环
          addedFlag = true;
          break;
        }
      }
      // 如果没有添加，则末尾添加
      if (!addedFlag) {
        this.items.push(queueElement);
      }
    }
  };
}
PriorityQueue.prototype = new Queue();
PriorityQueue.prototype.constructor = PriorityQueue;
PriorityQueue.prototype.toString = function() {
  let resStr = '';
  this.items.forEach(item => resStr += item.element + '-' + item.priority);
  return resStr;
};
export default PriorityQueue;
