import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScreenComponent } from './match-screen.component';

describe('MatchScreenComponent', () => {
  let component: MatchScreenComponent;
  let fixture: ComponentFixture<MatchScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
