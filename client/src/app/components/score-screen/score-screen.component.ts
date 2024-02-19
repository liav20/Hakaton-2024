import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';


@Component({
  selector: 'app-score-screen',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './score-screen.component.html',
  styleUrl: './score-screen.component.css'
})
export class ScoreScreenComponent {

}
