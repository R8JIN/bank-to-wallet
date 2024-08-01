import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferLogComponent } from './transfer-log.component';

describe('TransferLogComponent', () => {
  let component: TransferLogComponent;
  let fixture: ComponentFixture<TransferLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
