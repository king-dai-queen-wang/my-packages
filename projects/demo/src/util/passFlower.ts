import {Queue} from '../app/features/data-structure/queue/queue';

export function passFlower(nameList: any[] = [], num) {
  const queue = new Queue();
  debugger
  nameList.forEach(item => queue.enqueue(item));
  let index = 0;
  while (queue.size() > 1) {
    if (index === num - 1) {
      index = 0;
      queue.dequeue();
    } else {
      queue.enqueue(queue.front());
      queue.dequeue();
      index++;
    }

  }
  return queue.front();
}
