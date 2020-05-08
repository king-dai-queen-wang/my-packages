import {TetrisGame} from './tetris-game';
import {Renderer2} from '@angular/core';

export class TetrisLocal {
  constructor(render2: Renderer2) {
    this.game = new TetrisGame(render2);
  }
  INTERVAL = 200;
  // 游戏对象
  game: TetrisGame;
  timer = null;
  // 时间
  time = 0;
  // 时间计数器
  timeCount = 0;

  start(gameDom: HTMLBaseElement,
        nextDom: HTMLBaseElement,
        timeDom: HTMLBaseElement,
        scoreDom: HTMLBaseElement,
        resultDom: HTMLBaseElement) {
    this.game.init({
      gameDiv: gameDom,
      nextDiv: nextDom,
      timeDiv: timeDom,
      scoreDiv: scoreDom,
      resultDiv: resultDom
    }, this.generateType(), this.generateDir());
    this.game.performNext(this.generateType(), this.generateDir());
    this.timer = setInterval(this.move.bind(this), this.INTERVAL);
  }
  // 随机生成一个方块种类
  generateType() {
    return Math.ceil((Math.random() * 7) + 1) - 1;
  }
  // 随机生成旋转次数
  generateDir() {
    return Math.ceil(Math.random() * 4) - 1;
  }

  move() {
    this.timeFunc();
    if (!this.game.down()) {
      this.game.fixed();
      const line = this.game.checkClear();
      if (line) {
        this.game.addScore(line);
      }
      const isGameOver = this.game.checkGameOver();
      if (isGameOver) {
        this.game.gameOver(isGameOver);
        this.stop();
      } else {
        this.game.performNext(this.generateType(), this.generateDir());
      }
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

// ⏲函数
  timeFunc() {
    this.timeCount += 1;
    if (this.timeCount === 5) {
      this.timeCount = 0;
      this.time += 1;
      this.game.setTime(this.time);
      if (this.time % 10 === 0) {
        this.game.addTailLines(this.generateBottomLine(2));
      }
    }
  }
//  随机生成干扰行
  generateBottomLine(lineNum: number) {
    const lines = [];
    for (let i = 0; i < lineNum; i++) {
      const line = [];
      for (let j = 0; j < 10; j++) {
        line.push(Math.ceil(Math.random() * 2) - 1);
      }
      lines.push(line);
    }
    return lines;
  }
}
