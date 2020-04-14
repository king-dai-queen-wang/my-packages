import { Component, OnInit } from '@angular/core';
import {BinarySearchTreeModel} from './binary-search-tree.model';

@Component({
  selector: 'app-binary-search-tree',
  templateUrl: './binary-search-tree.component.html',
  styleUrls: ['./binary-search-tree.component.scss']
})
export class BinarySearchTreeComponent implements OnInit {
  binarySearchTree = new BinarySearchTreeModel();
  constructor() { }

  ngOnInit() {
    this.binarySearchTree.insert(11, '11');
    this.binarySearchTree.insert(7, '7');
    this.binarySearchTree.insert(15, '15');
    this.binarySearchTree.insert(5, '5');
    this.binarySearchTree.insert(3, '3');
    this.binarySearchTree.insert(9, '9');
    this.binarySearchTree.insert(8, '8');
    this.binarySearchTree.insert(10, '10');
    this.binarySearchTree.insert(13, '13');
    this.binarySearchTree.insert(12, '12');
    this.binarySearchTree.insert(14, '14');
    this.binarySearchTree.insert(20, '20');
    this.binarySearchTree.insert(18, '18');
    this.binarySearchTree.insert(25, '25');
    this.binarySearchTree.insert(6, '6');
    console.log(this.binarySearchTree.search(5));
    this.binarySearchTree.remove(9);
    this.binarySearchTree.remove(7);
    this.binarySearchTree.remove(15);
    let res = '';
    this.binarySearchTree.postOrderTraverse( function(key): void {
      res += key + ' ';
    });
    console.log(res);
  }

}
