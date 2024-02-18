import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import game from '../../models/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-setup-game',
  standalone: true,
  imports: [CommonModule,
  FormsModule],
  templateUrl: './setup-game.component.html',
  styleUrl: './setup-game.component.css'
})
export class SetupGameComponent {
games:game []=[];
  constructor(
    private router: Router){

    } 
  isVisible = false;
  numTeams = 2;
  playersPerTeam = 3;

  showModal(): void {
    this.isVisible = true;
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      const modalContent = document.querySelector('.modal-content');
      if (modal && modalContent) {
        modal.classList.add('show');
        modalContent.classList.add('show');
      }
    }, 10);
  }
  hideModal(): void {
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    if (modal && modalContent) {
      modal.classList.remove('show');
      modalContent.classList.remove('show');
    }
    setTimeout(() => {
      this.isVisible = false;
    }, 400); // Match the timeout to the CSS transition duration
  }
  confirmSetup(): void {
    console.log(`Number of Teams: ${this.numTeams}, Players per Team: ${this.playersPerTeam}`);
    this.hideModal();
    this.router.navigate(['/host'])
  }
}
