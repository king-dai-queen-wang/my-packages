import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import './tooltip.scss';
@Directive({
  selector: '[dwwTooltip]'
})
export class TooltipDirective  implements OnInit {
  @Input() dwwTooltip: string;
  tooltipDiv: Node;
  constructor(private el: ElementRef, private render: Renderer2) {
    this.tooltipDiv = this.render.createElement('div');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    // this.render.addClass(this.tooltipDiv, 'open');
    this.render.appendChild(this.el.nativeElement, this.tooltipDiv);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.render.removeChild(this.el.nativeElement, this.tooltipDiv);
  }

  ngOnInit(): void {
    console.log(this.tooltipDiv, this.el.nativeElement, this.render);
    if (!this.tooltipDiv || !this.el || !this.render) {
      return;
    }
    const textNode = this.render.createText(this.dwwTooltip);
    this.render.addClass(this.tooltipDiv, 'tooltip');
    this.render.appendChild(this.tooltipDiv, textNode);

  }

}
