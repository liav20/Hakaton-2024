import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import User from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css'
})
export class EndGameComponent {

  constructor(private _gameService: GameService,
              private _userService: UserService,
              private router: Router) {}
  
  private _gameId: string = "65d25ed8d0f41e87a40a11ed";
  private _winTeam: User [] = [];
  private _loseTeam: User [] = [];
  private _waitingTeams: User [] [] = [];

  private _winScore: number = 0;
  private _loseScore: number = 0;

  private _scorers: User [] = [];
  
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
      this._gameId = "65d25ed8d0f41e87a40a11ed";
      let user1 = this._userService.getUser('65d1de15e914c3271131dd4e') as unknown as User
      let user2 = this._userService.getUser('65d1e650e914c3271131dd59') as unknown as User
      this._winTeam = [user1];
      this._loseTeam = [user2];
      this._waitingTeams = [];
      this._winScore = 2;
      this._loseScore = 1;
      this._scorers = [user1, user1, user2]
    }
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
      console.log(data);
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
    })
  }

}
