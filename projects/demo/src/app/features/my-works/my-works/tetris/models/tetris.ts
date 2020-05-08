import {Renderer2} from '@angular/core';

export class Tetris {
  constructor(public render2: Renderer2) {
  }


  // initNext(nextDom: HTMLBaseElement) {
  //   for (let i = 0; i < this.nextData.length; i++) {
  //     const nextDiv = [];
  //     for (let j = 0; j < this.nextData[i].length; j++) {
  //       const newNode = this.render2.createElement('div');
  //       newNode.className = 'none';
  //       newNode.style.top = (i * 20) + 'px';
  //       newNode.style.left = (j * 20) + 'px';
  //       this.render2.appendChild(nextDom, newNode);
  //       nextDiv.push(newNode);
  //     }
  //     this.nextDivs.push(nextDiv);
  //   }
  // }
  //
  //
  //
  // refreshNext() {
  //   for (let i = 0; i < this.nextData.length; i++) {
  //     for (let j = 0; j < this.nextData[0].length; j++) {
  //       if (this.nextData[i][j] === 0) {
  //         this.nextDivs[i][j].className = 'none';
  //       } else if (this.nextData[i][j] === 1) {
  //         this.nextDivs[i][j].className = 'done';
  //       } else if (this.nextData[i][j] === 2) {
  //         this.nextDivs[i][j].className = 'current';
  //       }
  //     }
  //   }
  // }
}

