import { Component, OnInit } from '@angular/core';
import {Queue} from './queue';
import {passFlower} from '../../../../../util/passFlower';
import PriorityQueue from './priority-queue';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // 测试Queue
    const queue = new Queue();
    console.log(passFlower([1, 2, 3, 4, 5], 3));

  //   测试priority Queue
    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue('abc', 1);
    priorityQueue.enqueue('nba', 20);
    priorityQueue.enqueue('ww', 22);
    priorityQueue.enqueue('dd', 11);
    console.log(priorityQueue);
  }

}
