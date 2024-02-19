import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  minutes: number = 8;
  seconds: number = 0;
  timer: any;
  isPaused: boolean = true;

  constructor() { }

ngOnInit(): void {
  this.updateDisplay();
}

startTimer() {
  this.isPaused = false;
  this.timer = setInterval(() => {
    this.updateTimer();
  }, 1000);
}

pauseTimer() {
  this.isPaused = true;
  clearInterval(this.timer);
}

resetTimer() {
  clearInterval(this.timer);
  this.minutes = 8;
  this.seconds = 0;
  this.updateDisplay();
}

updateTimer() {
  if (this.minutes === 0 && this.seconds === 0) {
    clearInterval(this.timer);
    return;
  }
  if (this.seconds === 0) {
    this.minutes--;
    this.seconds = 59;
  } else {
    this.seconds--;
  }
  this.updateDisplay();
}

updateDisplay() {
  // To do any additional formatting
}

formatTime(time: number): string {
  return (time < 10 ? '0' : '') + time;
}

}