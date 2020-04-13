import {Queue} from '../app/features/data-structure/catalogue/queue/queue';
// 击鼓传花
export function passFlower(nameList: any[] = [], num) {
  const queue = new Queue();
  nameList.forEach(item => queue.enqueue(item));
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    queue.dequeue();
  }
  return queue.front();
}
