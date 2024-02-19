import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToGameComponent } from './add-to-game.component';

describe('AddToGameComponent', () => {
  let component: AddToGameComponent;
  let fixture: ComponentFixture<AddToGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
