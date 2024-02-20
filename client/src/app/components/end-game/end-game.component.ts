import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import User from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css'
})
export class EndGameComponent {

  constructor(private _gameService: GameService,
              private _userService: UserService,
              private router: Router) {}
  
  private _gameId: string = "65d25eefd0f41e87a40a11ef";
  private _winTeam: string [] = [];
  private _loseTeam: string [] = [];
  private _waitingTeams: string [] [] = [];

  private _winScore: number = 0;
  private _loseScore: number = 0;

  private _scorers: string [] = [];

  protected winNames: string[] = [];
  protected loseNames: string[] = [];
  protected scorersNames: {username: string, goals: number}[] = [];
  
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this._gameId = navigation.extras.state['gameId'];
      this._winTeam = navigation.extras.state['winTeam'];
      this._loseTeam = navigation.extras.state['loseTeam'];
      this._winScore = navigation.extras.state['winScore'];
      this._loseScore = navigation.extras.state['loseScore'];
      this._scorers = navigation.extras.state['scorers'];
    }
    else{
      let user1Id = '65d1de15e914c3271131dd4e'
      let user2Id = '65d1e650e914c3271131dd59'
      this._winTeam.push(user1Id);
      this._loseTeam.push(user2Id);
      this._scorers.push(user1Id, user2Id , user1Id);
      this._winScore = 2
      this._loseScore = 1
    }

    this._winTeam.forEach(id => {
      this._userService.getUser(id).subscribe(user => {
        if (user) {
          this.winNames.push(user.username);
        }
      })
    })

    this._loseTeam.forEach(id => {
      this._userService.getUser(id).subscribe(user => {
        if (user) {
          this.loseNames.push(user.username);
        }
      })
    })
    const scorerCounts: {[key: string]: number} = {};
      this._scorers.forEach(scorerId => {
        if (scorerCounts[scorerId]) {
          scorerCounts[scorerId]++;
        } else {
          scorerCounts[scorerId] = 1;
        }
      });
    
    Object.entries(scorerCounts).forEach(([scorerId, count]) => {
      this._userService.getUser(scorerId).subscribe(user => {
        this.scorersNames.push({username: user.username, goals: count});
      })
    })

    console.log(this.scorersNames);
    console.log(this.winNames);
    console.log(this.loseNames);
  }

  endGame() {
    const body = {
      WinningTeam: this._winTeam,
      LosingTeam: this._loseTeam,
      Scorers: this._scorers,
      LosingScore: this._loseScore,
      WinningScore: this._winScore
    }
    console.log(body);
    this._gameService.postEndGame(this._gameId, body).subscribe(data => {
      console.log('body:' + body);
      // this.router.navigate(['/home']);
    }, err => {
      console.log(err);
    })
  }

}
