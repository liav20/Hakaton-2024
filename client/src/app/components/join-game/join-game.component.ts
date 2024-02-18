import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-game',
  standalone: true,
  imports: [CommonModule,
            FormsModule],
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.css'
})
export class JoinGameComponent {
  isVisible = false;

  link: string = "";

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
  confirmJoin(): void {
      console.log('you joined the game via link: ' + this.link);
      this.hideModal();
  }
}
