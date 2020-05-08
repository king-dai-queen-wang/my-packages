import {TetrisSquareBase} from './tetris-square-base';
import {TetrisSquare1} from './tetris-square-1';
import {TetrisSquare2} from './tetris-square-2';
import {TetrisSquare3} from './tetris-square-3';
import {TetrisSquare4} from './tetris-square-4';
import {TetrisSquare5} from './tetris-square-5';
import {TetrisSquare6} from './tetris-square-6';
import {TetrisSquare7} from './tetris-square-7';

export class TetrisFactory {
  static make(index, dir): TetrisSquareBase {
    let s: TetrisSquareBase;
    switch (index) {
      case 1: {
        s = new TetrisSquare1();
        break;
      }
      case 2: {
        s = new TetrisSquare2();
        break;
      }
      case 3: {
        s = new TetrisSquare3();
        break;
      }
      case 4: {
        s = new TetrisSquare4();
        break;
      }
      case 5: {
        s = new TetrisSquare5();
        break;
      }
      case 6: {
        s = new TetrisSquare6();
        break;
      }
      case 7: {
        s = new TetrisSquare7();
        break;
      }
      default: {
        break;
      }
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
  }
}
