import { Component, OnInit } from '@angular/core';
import {LinkedList} from './linked-list';
import { DoublyLinkedList } from './doubly-linked-list';

@Component({
  selector: 'app-linked-list',
  templateUrl: './linked-list.component.html',
  styleUrls: ['./linked-list.component.scss']
})
export class LinkedListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const linkedList = new LinkedList();
    linkedList.append('dww1');
    linkedList.append('dww2');
    linkedList.insert(1, 'wcj1');
    linkedList.append('dww3');
    linkedList.update(2, 'dww22');
    linkedList.removeAt(3);
    linkedList.remove('dww22');
    console.table(linkedList.toString());
    const doublyLinkedList = new DoublyLinkedList();
    doublyLinkedList.append('dw1');
    doublyLinkedList.append('dw2');
    doublyLinkedList.append('dw3');
    doublyLinkedList.append('dw4');
  }

}
