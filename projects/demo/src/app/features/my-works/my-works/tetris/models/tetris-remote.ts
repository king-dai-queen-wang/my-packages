import {TetrisGame} from './tetris-game';
import {Renderer2} from '@angular/core';
import Socket = SocketIOClient.Socket;
import {TetrisLocal} from './tetris-local';

export class TetrisRemote extends TetrisLocal {
  game: TetrisGame;
  socket: Socket;
  gameDom: HTMLBaseElement;
  nextDom: HTMLBaseElement;
  timeDom: HTMLBaseElement;
  scoreDom: HTMLBaseElement;
  resultDom: HTMLBaseElement;

  constructor(render2: Renderer2,
              socket: Socket,
              gameDom: HTMLBaseElement,
              nextDom: HTMLBaseElement,
              timeDom: HTMLBaseElement,
              scoreDom: HTMLBaseElement,
              resultDom: HTMLBaseElement,
              ) {
    super(render2, gameDom, nextDom, timeDom, scoreDom, resultDom);
    this.socket = socket;
    this.bindSocket();
  }
  start(type: number, dir: number) {
    this.game.init({
      gameDiv: this.gameDom,
      nextDiv: this.nextDom,
      timeDiv: this.timeDom,
      scoreDiv: this.scoreDom,
      resultDiv: this.resultDom
    }, type, dir);
  }

  bindSocket() {
    const self = this;
    this.socket.on('init', function(data: {type: number, dir: number}) {
      self.start(data.type, data.dir);
    });

    this.socket.on('performNext', function(data: {type: number, dir: number}) {
      self.game.performNext(data.type, data.dir);
    });

    this.socket.on('rotate', function(data) {
      self.game.rotate();
    });

    this.socket.on('left', function(data) {
      self.game.left();
    });

    this.socket.on('right', function(data) {
      self.game.right();
    });

    this.socket.on('down', function(data) {
      self.game.down();
    });
    this.socket.on('fixed', function(data) {
      self.game.fixed();
    });

    this.socket.on('fall', function(data) {
      self.game.fall();
    });
    this.socket.on('line', function(data: number) {
      self.game.checkClear();
      self.game.addScore(data);
    });

    this.socket.on('time', function(data) {
      self.game.setTime(data);
    });

    this.socket.on('lose', function(data) {
      self.game.gameOver(false);
    });

    this.socket.on('addTailLines', function(data) {
      self.game.addTailLines(data);
    });
  }
}
