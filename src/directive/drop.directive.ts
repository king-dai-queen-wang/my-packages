import {Directive, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[rpsDrop]'
})
export class DropDirective {

  @Output() rpsDragOver: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() rpsDrop: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() rpsDragEnter: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() rpsDragLeave: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private renderer: Renderer2) {}

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    this.rpsDragOver.emit(event);
    this.rpsDrop.emit(event);
    event.dataTransfer.clearData();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();

    this.rpsDragOver.emit(event);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    event.preventDefault();

    this.rpsDragLeave.emit(event);
  }


  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    event.preventDefault();

    this.rpsDragEnter.emit(event);
  }

}
