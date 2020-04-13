import { Component, OnInit } from '@angular/core';
import {LinkedList} from './linked-list';
import {DoublyLinkedList, IDoubleLinkedList} from './doubly-linked-list';

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
    const doublyLinkedList: IDoubleLinkedList = new DoublyLinkedList();
    doublyLinkedList.insert(0, 'dw1');
    doublyLinkedList.insert(2, 'err');
    doublyLinkedList.insert(1, 'dw2');
    doublyLinkedList.insert(2, 'dw3');
    doublyLinkedList.insert(0, 'dw4');
    doublyLinkedList.update(1, 'nnn');
    console.table(doublyLinkedList.backwardString());
    console.log(doublyLinkedList.removeAt(3));
  }

}
