import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-screen',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './match-screen.component.html',
  styleUrl: './match-screen.component.css'
})
export class MatchScreenComponent {
  teams: any[] = [];
  totalScores: number[] = [];

  constructor(private gameservice: GameService,
    private router : Router) { }

  ngOnInit() {
    this.gameservice.getTeamsObservable().subscribe(teams => this.teams = teams);
    this.gameservice.getTotalScoresObservable().subscribe(scores => this.totalScores = scores);
    this.gameservice.getTeamsObservable().subscribe(teams => {
      this.teams = teams;
    });
    this.gameservice.getTotalScoresObservable().subscribe(scores => {
      this.totalScores = scores;
    });
    this.gameservice.getTeamsObservable().subscribe(teams => this.teams = teams);
    this.gameservice.getTotalScoresObservable().subscribe(scores => this.totalScores = scores);
  }

  loadTeams() {
    const emails = ['user1@example.com', 'user2@example.com']; // Example emails
    const groupNumber = 2; // Example group number

    this.gameservice.getTeams(emails, groupNumber).subscribe({
      next: (data) => {
        this.teams = data.teams;
        this.totalScores = data.totalScores;
        console.log(this.teams, this.totalScores);
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
  start(){
    this.router.navigateByUrl('/scorescreen', { state: { teams: this.teams, totalScores: this.totalScores } });
  }
}
