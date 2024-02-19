import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LobbyService } from '../../services/lobby.service';

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
  gameId: string = '';
  userId: string = 'USER_ID_HERE'; 
  link: string = "";

    constructor(private lobbyservice: LobbyService){}

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
  confirmJoin(): void{
      if (!this.gameId) {
        alert('Please enter a game ID.');
        return;
      }
  
      this.lobbyservice.joinGame(this.gameId, this.userId).subscribe({
        next: (response) => {
          console.log('Joined game successfully', response);
          // Here you can redirect the user to the lobby or show a success message
        },
        error: (error) => {
          console.error('Error joining game:', error);
          // Handle error (show message to user, etc.)
        }
      });
    }
  }
