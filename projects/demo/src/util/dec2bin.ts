import {Stack} from '../app/features/data-structure/catalogue/stack/stack.model';
// 十进制转2进制
export function dec2bin(decNum: number) {
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
