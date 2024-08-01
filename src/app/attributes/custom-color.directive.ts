import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCustomColor]',
  standalone: true
})
export class CustomColorDirective {

  @Input() appCustomColor: string = '';

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    const color = this.getBackgroundColor(this.appCustomColor);
    this.el.nativeElement.style.backgroundColor = color;
  }

  private getBackgroundColor(appCustomColor: string): string {
    if (!appCustomColor) return '';
    
    const colorLower = appCustomColor.toLowerCase();
    switch(colorLower) {
      case 'esewa':
        return 'green';
      case 'fonepay':
        return 'red';
      default:
        return ''; // or any default color you prefer
    }
  }
}
