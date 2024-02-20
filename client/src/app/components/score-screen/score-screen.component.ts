import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service'; // Adjust the path as necessary
import { TimerComponent } from '../timer/timer.component';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-screen',
  standalone: true,
  imports: [CommonModule,TimerComponent],
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.css']
})
export class ScoreScreenComponent{
  gameId: string | undefined ;
  user : User | undefined;
  leftScore: number = 0;
  rightScore: number = 0;
  activeTeams: any; // Same here
  waitingTeams: any; // And here
  result: string = '0:0';
  teams: any[];
  totalScores: number[] = [];
  Scorers : string []=[];
  WinningTeams : string[] = [];
  LosinTeams: string[]=[];
  originalTeams: any[]; // Assuming this is populated with your original team data
  displayedTeams: any[] | undefined;
  group1Scored: boolean = false;
  group2Scored: boolean = false;
  private subscriptions = new Subscription();


  constructor(private router: Router,
    private gameService: GameService, private _userservice: UserService){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;
    this.teams = state?.teams || []; 
    this.originalTeams = []; // Populate this with your actual data
    this.updateDisplayedTeams();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this._userservice.currentUser.subscribe(user => {
        if (user) {
          this.user = user;
          console.log(this.user._id);
          if (this.user._id) {
            this.gameService.getGameId(this.user._id.toString()).subscribe(data => {
              this.gameId = data.gameId; // Assuming the response structure { gameId: string }
            }, error => console.error('Error fetching game ID:', error));
          }
        }
      }, error => console.error('Error fetching user:', error))
    );
    this.gameService.getTeamsObservable().subscribe(teams => {
      this.teams = teams;
    });

    this.gameService.getTotalScoresObservable().subscribe(scores => {
      this.totalScores = scores;
    });
    




  }
  increaseScore(isLeft: boolean) {
    if (isLeft) {
      this.leftScore += 1;
      this.group1Scored = true; // Enable Group 1 score buttons
      this.group2Scored = false; // Ensure Group 2 score buttons remain disabled
    } else {
      this.rightScore += 1;
      this.group2Scored = true; // Enable Group 2 score buttons
      this.group1Scored = false; // Ensure Group 1 score buttons remain disabled
    }
    this.updateDisplayedTeams(); 
    this.checkForGameEnd();// Call this method if it affects the displayed teams
  }
  checkForGameEnd() {
    if (this.leftScore === 2) {
      // Group 1 wins
      this.endGame(1);
    } else if (this.rightScore === 2) {
      // Group 2 wins
      this.endGame(2);
    }
  }
  endGame(winningGroupIndex: number) {
    // Assuming the first group is index 0
    if (winningGroupIndex === 1) {
      this.WinningTeams.push(...this.teams[0].map((team: any) => team._id));
      this.LosinTeams.push(...this.teams[1].map((team: any) => team._id));
    } else if (winningGroupIndex === 2) {
      this.WinningTeams.push(...this.teams[1].map((team: any) => team._id));
      this.LosinTeams.push(...this.teams[0].map((team: any) => team._id));
    }
    // Here you can navigate to a different route or display a winning message
    console.log('Game Ended. Winning Group:', winningGroupIndex);
    const gamedata = {
      gameId: this.gameId,
      winTeam: this.WinningTeams,
      loseTeam: this.LosinTeams,
      winScore: 2,
      loseScore: 0,
      scorers: this.Scorers
    }
    this.router.navigate(['/endgame'], );
    
  }

  score(teamIndex: number, groupIndex: number) {
    // Assuming `teams` is an array of arrays, with each sub-array representing a group of teams
    const scorerId = this.teams[groupIndex][teamIndex]._id;
    this.Scorers.push(scorerId); // Add the _id of the scoring player to the Scorers array
    console.log(`Player ${scorerId} from Group ${groupIndex + 1} scored`);

    // Disable all group buttons again
    this.group1Scored = false;
    this.group2Scored = false;
  }
  group1Scores() {
    this.group1Scored = true;
  }
  group2Scores(){
    this.group2Scored = true;
  }

  updateDisplayedTeams() {
    // Only display the first two groups if there are more than two
    if (this.originalTeams.length > 2) {
      this.displayedTeams = this.originalTeams.slice(0, 2);
    } else {
      this.displayedTeams = this.originalTeams;
    }
  }
}
