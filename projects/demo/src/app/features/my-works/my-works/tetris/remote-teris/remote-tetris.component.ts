import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import {TetrisLocal} from '../models/tetris-local';
import {TetrisRemote} from '../models/tetris-remote';
import {HttpClient} from '@angular/common/http';
const SOCKETIO_URL = 'http://localhost:3000/';
@Component({
  selector: 'app-remote-tetris',
  templateUrl: './remote-tetris.component.html',
  styleUrls: ['./remote-tetris.component.scss']
})
export class RemoteTetrisComponent implements OnInit, AfterViewInit {
  @ViewChild('local_game', {read: ElementRef, static: true}) localGame: ElementRef;
  @ViewChild('local_next', { read: ElementRef }) localNext: ElementRef;
  @ViewChild('local_time', { read: ElementRef }) localTime: ElementRef;
  @ViewChild('local_score', { read: ElementRef }) localScore: ElementRef;
  @ViewChild('local_result', { read: ElementRef }) localResult: ElementRef;

  @ViewChild('remote_game', {read: ElementRef, static: true}) remoteGame: ElementRef;
  @ViewChild('remote_next', { read: ElementRef }) remoteNext: ElementRef;
  @ViewChild('remote_time', { read: ElementRef }) remoteTime: ElementRef;
  @ViewChild('remote_score', { read: ElementRef }) remoteScore: ElementRef;
  @ViewChild('remote_result', { read: ElementRef }) remoteResult: ElementRef;
  @ViewChild('recv', { read: ElementRef }) recv: ElementRef;
  @ViewChild('waiting', { read: ElementRef }) waiting: ElementRef;
  localTetris: TetrisLocal;
  remoteTetris: TetrisRemote;
  websocket: SocketIOClient.Socket;
  constructor(private render2: Renderer2,
              public httpService: HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
  start() {
    this.localTetris = new TetrisLocal(
      this.render2,
      this.localGame.nativeElement,
      this.localNext.nativeElement,
      this.localTime.nativeElement,
      this.localScore.nativeElement,
      this.localResult.nativeElement);
    this.remoteTetris = new TetrisRemote(
      this.render2,
      this.websocket,
      this.remoteGame.nativeElement,
      this.remoteNext.nativeElement,
      this.remoteTime.nativeElement,
      this.remoteScore.nativeElement,
      this.remoteResult.nativeElement);

    const currentType = this.localTetris.generateType();
    const currentDir = this.localTetris.generateDir();
    this.localTetris.game.init({
      gameDiv: this.localGame.nativeElement,
      nextDiv: this.localNext.nativeElement,
      timeDiv: this.localTime.nativeElement,
      scoreDiv: this.localScore.nativeElement ,
      resultDiv: this.localResult.nativeElement
    }, currentType, currentDir);
    this.websocket.emit('init', {type: currentType, dir: currentDir});
    //
    const nextType = this.remoteTetris.generateType();
    const nextDir = this.remoteTetris.generateDir();
    this.localTetris.game.performNext(nextType, nextDir);
    this.websocket.emit('performNext', {
      type: nextType, dir: nextDir
    });

    this.localTetris.timer = setInterval(this.localTetris.move.bind(this.localTetris, this.websocket), this.localTetris.INTERVAL);
  }

  createWebSocket() {
    const self = this;
    this.websocket =  io(SOCKETIO_URL);
    this.websocket.on('enter', function(data) {
      self.showMsg(data, 'enter');
    });
    this.websocket.on('message', function(data) {
      self.showMsg(data, 'message');
    });
    this.websocket.on('leave', function(data) {
      self.showMsg(data, 'leave');
    });
    this.websocket.on('waiting', function(data) {
      self.waiting.nativeElement.innerHTML =  data;
    });
    this.websocket.on('lose', function(data) {
      self.localTetris.game.gameOver(true);
    });
    this.websocket.on('start', function(data) {
      self.waiting.nativeElement.innerHTML =  '';
      self.start();
    });
    this.websocket.on('bottomLines', function(data) {
      self.localTetris.game.addTailLines(data);
      self.websocket.emit('addTailLines', data);
    });

    this.websocket.on('lose', function(data) {
      self.localTetris.game.gameOver(true);
      self.localTetris.stop();
    });

    this.websocket.on('leave', function(data) {
      self.localTetris.resultDom.innerHTML = '对方掉线';
      self.localTetris.stop();
      self.remoteTetris.resultDom.innerHTML = '已掉线';
    });
  }
  sendWebsocket({target}: {target: HTMLInputElement}) {
    this.websocket.emit('message', target.value);
  }

  disconnect() {
    this.websocket.emit('disconnect');
    this.websocket = null;
  }

  showMsg(str, type) {
    const div = this.render2.createElement('div');
    div.innerHTML = str;
    if (type === 'enter') {
      div.style.color = 'blue';
    } else if (type === 'leave') {
      div.style.color = 'red';
    }
    this.recv.nativeElement.appendChild(div);
  }

  down() {
    this.localTetris.game.down();
    this.websocket.emit('down');
  }

  left() {
    this.localTetris.game.left();
    this.websocket.emit('left');
  }

  right() {
    this.localTetris.game.right();
    this.websocket.emit('right');
  }

  rotate() {
    this.localTetris.game.rotate();
    this.websocket.emit('rotate');
  }

  fall() {
    this.localTetris.game.fall();
    this.websocket.emit('fall');
  }

  ajax() {
    this.httpService.post('/api/', {}).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
