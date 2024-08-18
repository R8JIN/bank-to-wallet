import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLogComponent } from './user-profile-log.component';

describe('UserProfileLogComponent', () => {
  let component: UserProfileLogComponent;
  let fixture: ComponentFixture<UserProfileLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
