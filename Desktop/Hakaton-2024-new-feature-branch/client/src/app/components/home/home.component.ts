import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SetupGameComponent } from '../setup-game/setup-game.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SetupGameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  averageRating: number = 45;
  avatars = [
      'assets/avatars/avatar1.png',
      'assets/avatars/avatar2.png',
      'assets/avatars/avatar3.png',
      'assets/avatars/avatar4.png',
      'assets/avatars/avatar5.png',
  ];

  selectedAvatar = '';

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  
  onButtonClick(){
    alert("Going to start...");
  }
  onJoinGameClick(){
    alert("Join Game")
  }

  playerName: string = 'John Doe';
}
