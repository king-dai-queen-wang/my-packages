import { Component, OnInit } from '@angular/core';
import {SetCollectionModel} from './set-collection.model';

@Component({
  selector: 'app-set-collection',
  templateUrl: './set-collection.component.html',
  styleUrls: ['./set-collection.component.scss']
})
export class SetCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const set1 = new SetCollectionModel();
    set1.add(0);
    const set2 = new SetCollectionModel();
    set2.add('ddd');
    set2.add(12);
    set2.add(0);
    console.log(set1.union(set2).values());
    console.log(set1.intersection(set2).values());
    console.log(set1.difference(set2).values());
    console.log(set1.subSet(set2));
  }

}
