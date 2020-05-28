import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dww-drag-drop-dashboard',
  templateUrl: './drag-drop-dashboard.component.html',
  styleUrls: ['./drag-drop-dashboard.component.scss']
})
export class DragDropDashboardComponent implements OnInit {
  dropList = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'},
    {id: 3, name: 'item 3'},
    {id: 4, name: 'item 4'},
    {id: 5, name: 'item 5'},
  ];
  constructor() { }

  ngOnInit() {
  }

  onDragStart(event: Event, param: any) {
    // event.preventDefault();
  }

  onDragEnd(event: Event, param: any) {
    // event.preventDefault();
  }

  dragover(event: DragEvent) {
    event.preventDefault();
    // 如果拖放在li上
    if (event.target instanceof HTMLLIElement ) {
      if (event.offsetX <= event.target.offsetHeight / 2) {
      //  前面插入
        console.log('前面插入');
      } else {
      //  后面插入
        console.log('后面插入');
      }
      return;
    }
    if (event.target instanceof HTMLUListElement ) {
      console.log('ul后面插入');
    }
  }

  onDrop(event: DragEvent) {
    // event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain');
    console.log(event.target);
    if (event.target instanceof HTMLUListElement ) {
      (event.target as HTMLElement).appendChild(document.getElementById(sourceId));
    }
  }
}
