import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HighlightDirective } from '../attributes/highlight.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [RouterModule, HighlightDirective, CommonModule],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent {

}
