import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from '../services/local/local.service';
import { CustomColorDirective } from '../attributes/custom-color.directive';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule, CustomColorDirective],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent  {
  @Input() data: any ;
  // @Input() statement !: boolean;

  @Output() 
  statement = new EventEmitter<boolean>();

  emitEvent() {
    this.statement.emit(false);
  }

  localService = inject(LocalService);
  username: string = '';
  // 
  public response: any;
  constructor(){
    // console.log(JSON.parse(this.data));
    console.log(this.data);
    this.response = this.data;
    this.username = this.localService.getData('username');
   
  }


}
