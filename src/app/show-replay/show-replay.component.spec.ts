import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReplayComponent } from './show-replay.component';

describe('ShowReplayComponent', () => {
  let component: ShowReplayComponent;
  let fixture: ComponentFixture<ShowReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
