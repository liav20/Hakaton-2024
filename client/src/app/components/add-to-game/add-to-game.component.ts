import { Component, OnInit } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-to-game.component.html',
  styleUrls: ['./add-to-game.component.css'] // Correct property name
})
export class AddToGameComponent implements OnInit {
  user: User | undefined;
 // Example limit, adjust as needed
  emails: Set<string> = new Set(); 
  private subscriptions = new Subscription();
  constructor(private userService: UserService,
    private _gameService : GameService,
    private router : Router) {}
    groupNumber: number = 0;
    playersPerTeam: number=0;
    hostId: any;
    totalInvites : number = 0; 
  
    ngOnInit() {
      this.userService.currentUser.subscribe(user => {
        if (user) {
          this.user = user;
          this.userService.getUser(this.user._id).subscribe(user => {
            if (user) {
              this.user = user;
              this.emails.add(user.email);
            }
          })
        }
      });
      const setup = this._gameService.getGameSetup();
      this.groupNumber = setup.numTeams;
      this.playersPerTeam = setup.playersPerTeam;
      this.totalInvites = this.groupNumber * this.playersPerTeam -1;
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

  addFriend(friendId: string): void {
    if (this.totalInvites > 0 && !this.emails.has(friendId)) {
      console.log('Adding friend:', friendId);
      // Here you would call a service method to add the friend, passing friendId as argument
      this.emails.add(friendId);
      this.totalInvites--;
      console.log(this.emails)
    }
  }

  isInvited(friendId: string): boolean {
    return this.emails.has(friendId);
  }

  navigateToHost(): void {
    this.router.navigate(['/match']);
  }
  sendInvite(): void {
    if (this.user) {
      const invitedFriendsArray = Array.from(this.emails);
      this._gameService.sendInvites(this.groupNumber, invitedFriendsArray).subscribe(
         (response) => {
          console.log(response);
          console.log('Invites sent successfully', response);
          this._gameService.setTeamsAndScores(response.teams, response.totalScores); // Implement this method in your service
        this.navigateToHost();
        }
    )}
  }
}

