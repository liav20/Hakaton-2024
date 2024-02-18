import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SetupGameComponent } from '../setup-game/setup-game.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SetupGameComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() {}

 
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


  onJoinGameClick(){
    alert("Join Game")
  }

  playerName: string = 'John Doe';
}
