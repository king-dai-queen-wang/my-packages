export class Pos {
  x: number = null;
  y: number = null;
}
export class TetrisSquareBase {
// 方块数据
  data: number[][];
  origin: Pos = {
    x: 0,
    y: 0
  };
  // 旋转index
  dir: number = 0;
  rotates: number[][][];
  constructor() {
  }
  // 将pos坐标下移1位，检测当前方块在下面16个格子是否合法
  canDown(isValid: (pos: Pos, data: number[][]) => boolean) {
    const test: Pos = new Pos();
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data);
  }

  canLeft(isValid: (pos: Pos, data: number[][]) => boolean) {
    const test: Pos = new Pos();
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
  }

  canRight(isValid: (pos: Pos, data: number[][]) => boolean) {
    const test: Pos = new Pos();
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
  }

  canRotate(isValid: (pos: Pos, data: number[][]) => boolean) {
    const d = (this.dir + 1) % 4;
    const test: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        test[i][j] = this.rotates[d][i][j];
      }
    }
    return isValid(this.origin, test);
  }

  down() {
    this.origin.x = this.origin.x + 1;
  }

  rotate(num?: number) {
    if (!num) {
      num = 1;
    }
    this.dir = (this.dir + num) % 4 ;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        this.data[i][j] = this.rotates[this.dir][i][j];
      }
    }
  }

  left() {
    this.origin.y = this.origin.y - 1;
  }

  right() {
    this.origin.y = this.origin.y + 1;
  }
}
