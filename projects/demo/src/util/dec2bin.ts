import {Stack} from '../app/features/data-structure/stack/stack.model';

export function dec2bin(decNum: number) {
  debugger
  const stack = new Stack();
  while (decNum > 0) {
    stack.push(decNum % 2);
    decNum = Math.floor(decNum / 2);
  }
  let binStr = '';
  while (!stack.isEmpty()) {
    binStr += stack.pop();
  }
  return Number(binStr);
}
