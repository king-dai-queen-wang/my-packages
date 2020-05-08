import {Renderer2} from '@angular/core';
import {
  TetrisSquareBase,
  Pos,
  TetrisSquare1,
  TetrisSquare2,
  TetrisSquare3,
  TetrisSquare4,
  TetrisSquare5
} from './tetris-square';
import {TetrisFactory} from './tetris-square/tetris-factory';

export class TetrisGame {
  score = 0;
  // 当前方块
  cur: TetrisSquareBase;
  // next方块
  next: TetrisSquareBase;
  // 游戏矩阵
  gameData: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  // 下一个方块的dom容器
  nextDiv: HTMLBaseElement;
  // 游戏棋盘的dom容器
  gameDiv: HTMLBaseElement;

  gameDivs: HTMLBaseElement[][] = [];
  nextDivs: HTMLBaseElement[][] = [];

  timeDiv;
  scoreDiv;
  resultDiv;

  constructor(public render2: Renderer2) {
  }

  init(doms: {
         gameDiv: HTMLBaseElement,
         nextDiv: HTMLBaseElement,
         timeDiv: HTMLBaseElement,
         scoreDiv: HTMLBaseElement,
         resultDiv: HTMLBaseElement
       },
       type: number,
       dir: number) {
    this.gameDiv = doms.gameDiv;
    this.nextDiv = doms.nextDiv;
    this.timeDiv = doms.timeDiv;
    this.scoreDiv = doms.scoreDiv;
    this.resultDiv = doms.resultDiv;
    // this.cur = TetrisFactory.make(3, 2);
    this.next = TetrisFactory.make(type, dir);

    // // 当前方块的坐标
    // this.cur.origin.x = 2;
    // this.cur.origin.y = 6;

    // 初始化游戏棋盘
    this.initDiv(this.gameDiv, this.gameData, this.gameDivs);
    // 初始化下一步的方块棋盘
    this.initDiv(this.nextDiv, this.next.data, this.nextDivs);

    // this.setData();
    // this.refreshDiv(this.gameData, this.gameDivs);
    this.refreshDiv(this.next.data, this.nextDivs);
  }

  initDiv(containerDom: HTMLBaseElement, data: number[][], divs: HTMLBaseElement[][]) {
    for (let i = 0; i < data.length; i++) {
      const div = [];
      for (let j = 0; j < data[i].length; j++) {
        const newNode = this.render2.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i * 20) + 'px';
        newNode.style.left = (j * 20) + 'px';
        this.render2.appendChild(containerDom, newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }
  // 刷新div
  refreshDiv(data, divs) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] === 0) {
          divs[i][j].className = 'none';
        } else if (data[i][j] === 1) {
          divs[i][j].className = 'done';
        } else if (data[i][j] === 2) {
          divs[i][j].className = 'current';
        }
      }
    }
  }

  // 检测点是否合法
  check(pos, x, y) {
    // 棋盘的上边
    if (pos.x + x < 0) {
      return false;
    }
    // 棋盘的下边
    if (pos.x + x >= this.gameData.length) {
      return false;
    }
    // 棋盘的左边
    if (pos.y + y < 0) {
      return false;
    }
    // 棋盘的右边
    if (pos.y + y >= this.gameData[0].length) {
      return false;
    }
    // 检测碰撞
    if (this.gameData[pos.x + x][pos.y + y] === 1) {
      return false;
    }
    return true;
  }

  // 检测数据是否合法, pos 左上角的（y, x） 位置，data: 要检测的数据
  isValid(pos, data): boolean {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] !== 0) {
          if (!this.check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // 清除数据
  clearData() {
    for (let i = 0; i < this.cur.data.length; i++) {
      for (let j = 0; j < this.cur.data[0].length; j++) {
        if (this.check(this.cur.origin, i, j)) {
          this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 0;
        }
      }
    }
  }

  setData() {
    for (let i = 0; i < this.cur.data.length; i++) {
      for (let j = 0; j < this.cur.data[0].length; j++) {
        if (this.check(this.cur.origin, i, j)) {
          this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = this.cur.data[i][j];
        }
      }
    }
  }
  // 下移
  down(): boolean {
    if (this.cur.canDown(this.isValid.bind(this))) {
      this.clearData();
      this.cur.down();
      this.setData();
      this.refreshDiv(this.gameData, this.gameDivs);
      return true;
    }
    return false;
  }

  // 上移
  rotate() {
    if (this.cur.canRotate(this.isValid.bind(this))) {
      this.clearData();
      this.cur.rotate();
      this.setData();
      this.refreshDiv(this.gameData, this.gameDivs);
    }

  }

  // 左移
  left() {
    if (this.cur.canLeft(this.isValid.bind(this))) {
      this.clearData();
      this.cur.left();
      this.setData();
      this.refreshDiv(this.gameData, this.gameDivs);
    }

  }

  // 右移
  right() {
    if (this.cur.canRight(this.isValid.bind(this))) {
      this.clearData();
      this.cur.right();
      this.setData();
      this.refreshDiv(this.gameData, this.gameDivs);
    }

  }

  // 设置时间
  setTime(time: number) {
    this.timeDiv.innerHTML = time;
  }

  fall() {
    while (this.down()) { }
  }

  fixed() {
    for (let i = 0; i < this.cur.data.length; i++) {
      for (let j = 0; j < this.cur.data[0].length; j++) {
        if (this.check(this.cur.origin, i, j)) {
          if (this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] === 2) {
            this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 1;
          }
        }
      }
    }
    this.refreshDiv(this.gameData, this.gameDivs);
  }

  // 使用下一个方块
  performNext(type, dir) {
    this.cur = this.next;
    this.setData();
    this.next = TetrisFactory.make(type, dir);
    this.refreshDiv(this.gameData, this.gameDivs);
    this.refreshDiv(this.next.data, this.nextDivs);
  }
  // 消行
  checkClear() {
    let line = 0;
    // 从下往上检测是否可以消除
    for (let i = this.gameData.length - 1; i >= 0; i--) {
      let clear = true;
      for (let j = 0; j < this.gameData[0].length; j++) {
        if (this.gameData[i][j] !== 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line = line + 1;
        // 循环非 第0行， 将上一行的内容移动到下一行
        for (let m = i; m > 0; m--) { // 此处m 不能=0；若=0 ，则下面的循环 m - 1 为-1，会报错
          for ( let n = 0; n < this.gameData[0].length; n++) {
            this.gameData[m][n] = this.gameData[m - 1][n];
          }
        }
        // 第0行 全部清空
        for ( let n = 0; n < this.gameData[0].length; n++) {
          this.gameData[0][n] = 0;
        }
        // 因为上面都往下移了一行，所以这里要补索引
        i++;
      }
    }
    return line;
  }

  // 检查是否游戏结束
  checkGameOver(): boolean {
    let gameOver = false;
    for (let i = 0; i < this.gameData.length; i++) {
      if (this.gameData[1][i] === 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }

  addScore(line: number) {
    let s = 0;
    switch (line) {
      case 1: {
        s = 10;
        break;
      }
      case 2: {
        s = 30;
        break;
      }
      case 3: {
        s = 60;
        break;
      }
      case 4: {
        s = 100;
        break;
      }
      default: {
        break;
      }
    }
    this.score = this.score + s;
    this.scoreDiv.innerHTML = this.score;
  }

  gameOver(win: boolean) {
    if (win) {
      this.resultDiv.innerHTML = '你赢了！';
    } else {
      this.resultDiv.innerHTML = '你输了！';
    }
  }
  // 增加底部行
  addTailLines(lines: number[][]) {
    // 把所有行往上移动
    for (let i = 0; i < this.gameData.length - lines.length; i++) {
      this.gameData[i] = this.gameData[i + lines.length];
    }
    // 将下面的新空行赋值成加入的行
    for (let i = 0; i < lines.length; i++) {
      this.gameData[this.gameData.length - lines.length + i] = lines[i];
    }
    // 当前方块的位置往上移
    this.cur.origin.x = this.cur.origin.x - lines.length;
    if (this.cur.origin.x < 0) {
      this.cur.origin.x = 0;
    }
    this.refreshDiv(this.gameData, this.gameDivs);
  }
}
