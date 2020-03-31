import {Component, ElementRef, HostListener, Input, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {NavInterface} from './nav.interface';

@Component({
  selector: 'dww-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChildren('.nav-menu-item', {read: ElementRef}) navItems: QueryList<ElementRef>;
  @Input() data: NavInterface[] = null;
  constructor(public render2: Renderer2, public el: ElementRef) { }

  ngOnInit() {
  }

  toggleBurger(event: MouseEvent) {
    this.el.nativeElement.querySelector('.burger').classList.toggle('active');
    this.el.nativeElement.querySelector('.nav-menu').classList.toggle('open');
    this.el.nativeElement.querySelectorAll('.nav-menu-item')
      .forEach((item, index) => {
        if (item.style.animation) {
          item.style.animation = '';
        } else {
          item.style.animation = `0.3s ease-in sliderIn forwards ${index * 0.1 + 0.3}s`;
        }
      });
  }

}
