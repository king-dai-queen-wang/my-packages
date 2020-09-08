import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TetrisLocal} from '../models/tetris-local';
import {TetrisRemote} from '../models/tetris-remote';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, AfterViewInit {
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

  localTetris: TetrisLocal;
  remoteTetris: TetrisLocal;
  websocket: SocketIOClient.Socket;
  constructor(private render2: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.localTetris = new TetrisLocal(this.render2, this.localGame.nativeElement,
      this.localNext.nativeElement,
      this.localTime.nativeElement,
      this.localScore.nativeElement,
      this.localResult.nativeElement);

    this.localTetris.start(this.localTetris.generateType(), this.localTetris.generateDir());

    this.remoteTetris = new TetrisLocal(this.render2,
      this.remoteGame.nativeElement,
      this.remoteNext.nativeElement,
      this.remoteTime.nativeElement,
      this.remoteScore.nativeElement,
      this.remoteResult.nativeElement);
    this.remoteTetris.start( 2, 2);
  }

}
