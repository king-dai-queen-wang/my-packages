import { Component, OnInit } from '@angular/core';
import {Queue} from './queue';
import {passFlower} from '../../../../util/passFlower';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const queue = new Queue();

    console.log(passFlower([1, 2, 3, 4, 5], 3));
  }

}
