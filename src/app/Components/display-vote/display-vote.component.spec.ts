import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVoteComponent } from './display-vote.component';

describe('DisplayVoteComponent', () => {
  let component: DisplayVoteComponent;
  let fixture: ComponentFixture<DisplayVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayVoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
