import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-score-screen',
  standalone: true,
  imports: [TimerComponent, FormsModule],
  templateUrl: './score-screen.component.html',
  styleUrl: './score-screen.component.css'
})
export class ScoreScreenComponent {
  teamAGoals: number = 1;
  teamBGoals: number = 1;
  teamA: string = 'Daniel';
  teamB: string = 'Shlomi';

  constructor() { }

  decreaseGoal(team: string) {
    if (team === 'A' && this.teamAGoals > 0) {
      this.teamAGoals--;
    } else if (team === 'B' && this.teamBGoals > 0) {
      this.teamBGoals--;
    }
  }

  increaseGoal(team: string) {
    if (team === 'A') {
      this.teamAGoals++;
    } else if (team === 'B') {
      this.teamBGoals++;
    }
  }
}
