import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginControlsComponent } from './user-login-controls.component';

describe('UserLoginControlsComponent', () => {
  let component: UserLoginControlsComponent;
  let fixture: ComponentFixture<UserLoginControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
