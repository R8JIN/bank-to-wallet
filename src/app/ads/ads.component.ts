import { Component, inject } from '@angular/core';
import { CustomColorDirective } from '../attributes/custom-color.directive';
import { HighlightDirective } from '../attributes/highlight.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalService } from '../services/local/local.service';

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [ HighlightDirective, CommonModule, RouterModule],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css'
})
export class AdsComponent {
  localService = inject(LocalService);
  token: string = '';

  constructor(){
    this.token = this.localService.getData("token");
  }
}
