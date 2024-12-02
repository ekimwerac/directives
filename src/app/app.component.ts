import { Component } from '@angular/core';
import { HighlightedDirective } from './highlighted.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HighlightedDirective], // Import the directive
  template: `
    <h1 [appHighlighted]="'blue'">Blue Background</h1>
    <h1 [appHighlighted]>Default Yellow Background</h1>
    <h1 [appHighlighted]="'red'">Red Background</h1>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
