import { Component, OnInit } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { GameService } from '../../services/game.service';

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

  constructor(private userService: UserService,
    private router: Router,
    private _gameService : GameService) {}
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
    this.router.navigate(['/host']);
  }
  sendInvite(): void {
    if (this.user) {
      // Convert Set to Array for invitedFriends
      const invitedFriendsArray = Array.from(this.emails);
      console.log(invitedFriendsArray);
      this._gameService.sendInvites(this.groupNumber, invitedFriendsArray).subscribe(data =>{     
          this.navigateToHost();
        }
    )}
  }
}

