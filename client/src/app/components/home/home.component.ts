import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SetupGameComponent } from '../setup-game/setup-game.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JoinGameComponent } from '../join-game/join-game.component';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SetupGameComponent,JoinGameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: User | undefined;

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user.username);
      }
    });
  }
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
  playerName: string = 'John Doe';


  navigateToFriendManager() {
    this.router.navigate(['/friend-manager']);
  }
}
