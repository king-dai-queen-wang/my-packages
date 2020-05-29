import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dww-drag-drop-dashboard',
  templateUrl: './drag-drop-dashboard.component.html',
  styleUrls: ['./drag-drop-dashboard.component.scss']
})
export class DragDropDashboardComponent implements OnInit {
  statusList = [
    {
      name: '状态A',
      list: [
        {id: 1, name: 'item 1'},
        {id: 2, name: 'item 2'},
        {id: 3, name: 'item 3'},
        {id: 4, name: 'item 4'},
        {id: 5, name: 'item 5'},
      ]
    },
    {
      name: '状态B',
      list: [
      ]
    },
    {
      name: '状态C',
      list: [
        {id: 6, name: 'item 6'},
      ]
    },
    {
      name: '状态D',
      list: [
      ]
    },
    {
      name: '状态E',
      list: [
      ]
    },
    {
      name: '状态F',
      list: [
      ]
    },
    {
      name: '状态G',
      list: [
      ]
    },
  ];
  draggedEle: HTMLLIElement;
  constructor() { }

  ngOnInit() {
  }

  onDragStart(event: DragEvent, param: any) {
    (event.target as HTMLLIElement).style.opacity = '0.2';
    this.draggedEle = document.createElement('li');
    this.draggedEle.className = 'card-item';
    this.draggedEle.style.border = '1px dash #ddd';
    this.draggedEle.style.background = '#ddd';
    this.draggedEle.innerText = '要粘贴的位置';
  }

  onDragEnd(event: Event, param: any) {
    // event.preventDefault();
    (event.target as HTMLLIElement).style.opacity = '1';
    console.log(this.draggedEle, this.draggedEle.parentNode);
    if (this.draggedEle && this.draggedEle.parentNode) {
      this.draggedEle.parentNode.removeChild(this.draggedEle);
    }
  }

  dragover(event: DragEvent) {
    event.preventDefault();
    console.log({target: event.target},{offsetX: event.offsetX, offsetY: event.offsetY},{clientX: event.clientX, clientY: event.clientY});
    // 如果拖放在li上
    if (event.target instanceof HTMLLIElement ) {
      if (event.offsetY <= event.target.clientHeight / 2) {
      //  前面插入
      //   console.log('前面插入');
        event.target.parentNode.insertBefore(this.draggedEle, event.target);
      } else {
      //  后面插入
      //   console.log('后面插入');
        event.target.parentNode.insertBefore(this.draggedEle, event.target.nextSibling);
      }
      return;
    }
    if (event.target instanceof HTMLUListElement ) {
      // console.log('ul后面插入');
      event.target.appendChild(this.draggedEle);
    }
  }

  onUlDrop(event: DragEvent) {
    // event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain');
    if (confirm('确认移动吗？')) {
      if (event.target instanceof HTMLUListElement || event.target instanceof HTMLLIElement) {
        this.draggedEle.parentNode.replaceChild( document.getElementById(sourceId), this.draggedEle);
      }
    } else {

    }

  }

  onDragEnter(event: DragEvent) {
    // console.log('onDragEnter', event.target);
  }
}
