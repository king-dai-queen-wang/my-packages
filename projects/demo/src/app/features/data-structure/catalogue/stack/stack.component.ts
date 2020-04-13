import { Component, OnInit } from '@angular/core';
import {IStack, Stack} from './stack.model';
import {dec2bin} from '../../../../../util/dec2bin';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const stack: IStack = new Stack();
    stack.push('dww');
    stack.push('2');
    console.log(stack.peek());
    console.log(stack.toString());
    console.log(stack.size());

  //  stack 应用
  //  输出100 -》 2进制数字
    console.log(dec2bin(100));
  }

}
