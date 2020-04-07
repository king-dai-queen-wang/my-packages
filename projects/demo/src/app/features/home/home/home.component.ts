import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  edges = [
    ['id-a', 'id-b'],
    ['id-b', 'id-c'],
    ['id-c', 'id-d']
  ];
  nodes =  [
    {
      id: 'id-a',
      name: 'A',
      value: [115, 150],
    },
    {
      id: 'id-b',
      name: 'B',
      value: [500, 10]
    },
    {
      id: 'id-c',
      name: 'C',
      value: [55, 700]
    },
    {
      id: 'id-d',
      name: 'D',
      value: [40, 40]
    },
  ];
  constructor() { }

  ngOnInit() {
  }
}
