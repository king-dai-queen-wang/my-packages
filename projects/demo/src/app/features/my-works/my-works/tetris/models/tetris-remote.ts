import {TetrisGame} from './tetris-game';
import {Renderer2} from '@angular/core';

export class TetrisRemote {
  game: TetrisGame;
  constructor(render2: Renderer2) {
    this.game = new TetrisGame(render2);
  }
  start(gameDom: HTMLBaseElement,
        nextDom: HTMLBaseElement,
        timeDom: HTMLBaseElement,
        scoreDom: HTMLBaseElement,
        resultDom: HTMLBaseElement,
        type: number, dir: number) {
    this.game.init({
      gameDiv: gameDom,
      nextDiv: nextDom,
      timeDiv: timeDom,
      scoreDiv: scoreDom,
      resultDiv: resultDom
    }, type, dir);
  }
}
