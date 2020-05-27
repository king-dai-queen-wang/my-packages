import {TetrisGame} from './tetris-game';
import {Renderer2} from '@angular/core';
import Socket = SocketIOClient.Socket;

export class TetrisLocal {
  gameDom: HTMLBaseElement;
  nextDom: HTMLBaseElement;
  timeDom: HTMLBaseElement;
  scoreDom: HTMLBaseElement;
  resultDom: HTMLBaseElement;
  constructor(render2: Renderer2,
              gameDom: HTMLBaseElement,
              nextDom: HTMLBaseElement,
              timeDom: HTMLBaseElement,
              scoreDom: HTMLBaseElement,
              resultDom: HTMLBaseElement) {
    this.game = new TetrisGame(render2);
    this.gameDom = gameDom;
    this.nextDom = nextDom;
    this.timeDom = timeDom;
    this.scoreDom = scoreDom;
    this.resultDom = resultDom;
  }
  INTERVAL = 200;
  // 游戏对象
  game: TetrisGame;
  timer = null;
  // 时间
  time = 0;
  // 时间计数器
  timeCount = 0;

  start(type: number, dir: number) {
    this.game.init({
      gameDiv: this.gameDom,
      nextDiv: this.nextDom,
      timeDiv: this.timeDom,
      scoreDiv: this.scoreDom,
      resultDiv: this.resultDom
    }, type, dir);
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

  move(socket?: Socket) {
    this.timeFunc(socket);
    if (!this.game.down()) {
      this.game.fixed();
      socket && socket.emit('fixed');
      const line = this.game.checkClear();
      if (line) {
        this.game.addScore(line);
        socket && socket.emit('line', line);
        if (line > 1) {
          const bottomLines = this.generateBottomLine(line);
          socket && socket.emit('bottomLines', bottomLines);
        }
      }
      const isGameOver = this.game.checkGameOver();
      if (isGameOver) {
        this.game.gameOver(false);
        this.resultDom.innerHTML = '你输了';
        socket.emit('lose');
        this.stop();
      } else {
        const t = this.generateType();
        const d =  this.generateDir();
        this.game.performNext(t, d);
        socket && socket.emit('performNext', {type: t, dir: d});
      }
    } else {
      socket && socket.emit('down');
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

// ⏲函数
  timeFunc(socket ?: Socket) {
    this.timeCount += 1;
    if (this.timeCount === 5) {
      this.timeCount = 0;
      this.time += 1;
      this.game.setTime(this.time);
      socket && socket.emit('time', this.time);
      // if (this.time % 10 === 0) {
      //   this.game.addTailLines(this.generateBottomLine(2));
      // }
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
