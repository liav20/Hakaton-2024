import { Component } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lobby-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './lobby-create.component.html',
  styleUrl: './lobby-create.component.css'
})
export class LobbyCreateComponent {
  gameId: string="";
  hostId: string="";
  constructor(private lobbyService: LobbyService) {}

  createLobby() {
    this.lobbyService.createLobby(this.gameId, this.hostId).subscribe({
      next: (lobby) => console.log('Lobby created:', lobby),
      error: (error) => console.error('Error creating lobby:', error),
    });
  }
}
