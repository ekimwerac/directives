import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlighted]' // Matches elements with the "appHighlighted" attribute
})
export class HighlightedDirective implements OnInit {
  // Input to accept a dynamic background color
  @Input() appHighlighted: string | undefined;

  constructor(private el: ElementRef) {} // DI provides the DOM element reference

  ngOnInit() {
    // Apply the background color dynamically
    this.el.nativeElement.style.backgroundColor = this.appHighlighted || 'yellow';
  }
}

