import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TetrisLocal} from './models/tetris-local';
import {TetrisRemote} from './models/tetris-remote';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, AfterViewInit {
  @ViewChild('local_game', {read: ElementRef, static: true}) localGame: ElementRef;
  @ViewChild('local_next', {read: ElementRef, static: false}) localNext: ElementRef;
  @ViewChild('local_time', {read: ElementRef, static: false}) localTime: ElementRef;
  @ViewChild('local_score', {read: ElementRef, static: false}) localScore: ElementRef;
  @ViewChild('local_result', {read: ElementRef, static: false}) localResult: ElementRef;

  @ViewChild('remote_game', {read: ElementRef, static: true}) remoteGame: ElementRef;
  @ViewChild('remote_next', {read: ElementRef, static: false}) remoteNext: ElementRef;
  @ViewChild('remote_time', {read: ElementRef, static: false}) remoteTime: ElementRef;
  @ViewChild('remote_score', {read: ElementRef, static: false}) remoteScore: ElementRef;
  @ViewChild('remote_result', {read: ElementRef, static: false}) remoteResult: ElementRef;
  @ViewChild('recv', {read: ElementRef, static: false}) recv: ElementRef;

  localTetris: TetrisLocal;
  remoteTetris: TetrisRemote;
  websocket: SocketIOClient.Socket;
  constructor(private render2: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.localTetris = new TetrisLocal(this.render2);
    this.localTetris.start(
      this.localGame.nativeElement,
      this.localNext.nativeElement,
      this.localTime.nativeElement,
      this.localScore.nativeElement,
      this.localResult.nativeElement);

    this.remoteTetris = new TetrisRemote(this.render2);
    this.remoteTetris.start(
      this.remoteGame.nativeElement,
      this.remoteNext.nativeElement,
      this.remoteTime.nativeElement,
      this.remoteScore.nativeElement,
      this.remoteResult.nativeElement, 2, 2);
  }

  createWebSocket() {
    const _this = this;
    this.websocket =  io('http://localhost:3000');
    this.websocket.on('my other event', function(data) {
      const div = _this.render2.createElement('div');
      div.innerHTML = data.hello;
      _this.recv.nativeElement.appendChild(div);
    });
    // const _this = this;
    // this.websocket.onclose = function() {
    //   console.log('websocket closed');
    //   _this.recv.nativeElement.innerHTML = 'Closed';
    // };
    //
    // this.websocket.onmessage = function(e) {
    //   console.log(e.data);
    //   const div = _this.render2.createElement('div');
    //   div.innerHTML = e.data;
    //   _this.recv.nativeElement.appendChild(div);
    // };
  }

  sendWebsocket({target}: {target: HTMLInputElement}) {
    this.websocket.emit('news', {my: target.value});
  }

}
