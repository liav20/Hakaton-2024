import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupGameComponent } from './setup-game.component';

describe('SetupGameComponent', () => {
  let component: SetupGameComponent;
  let fixture: ComponentFixture<SetupGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
