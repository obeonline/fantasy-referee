import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayVoteStatsComponent } from './replay-vote-stats.component';

describe('ReplayVoteStatsComponent', () => {
  let component: ReplayVoteStatsComponent;
  let fixture: ComponentFixture<ReplayVoteStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplayVoteStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplayVoteStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
