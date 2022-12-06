import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReplaysComponent } from './list-replays.component';

describe('ListReplaysComponent', () => {
  let component: ListReplaysComponent;
  let fixture: ComponentFixture<ListReplaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReplaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
