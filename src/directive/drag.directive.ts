import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Directive({
  selector: '[rpsDrag]'
})
export class DragDirective {

  @Input() rpsDragData: any = null;
  @Output() rpsDragStart: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() rpsDragEnd: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() rpsDrag: EventEmitter<Event> = new EventEmitter<Event>();

  protected el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    // event.preventDefault();
    if (!isNullOrUndefined(this.rpsDragData)) {
      event.dataTransfer.setData('text/plain', this.rpsDragData);
    }

    this.rpsDragStart.emit(event);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    event.preventDefault();
    this.rpsDragEnd.emit(event);
    event.dataTransfer.clearData();
  }

  @HostListener('drag', ['$event'])
  onDrag(event) {
    event.preventDefault();
    this.rpsDrag.emit(event);
  }

}
