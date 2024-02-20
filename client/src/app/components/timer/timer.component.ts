import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer, startWith, takeWhile, map, of, interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
  time = 480; // Start from 8 minutes (480 seconds)
  displayTime = '';
  isRunning = false;
  private timerSubscription!: Subscription;

  ngOnInit(): void {
    this.formatTime(this.time); // Ensure this is called with the initial time to format "08:00"
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.pauseTimer();
  }

  startTimer() {
    this.isRunning = true;
    this.timerSubscription = interval(1000).pipe(
      startWith(this.time),
      takeWhile(() => this.isRunning && this.time >= 0)
    ).subscribe({
      next: () => {
        this.formatTime(this.time);
        this.time--;
      },
      complete: () => this.isRunning = false
    });
  }

  pauseTimer() {
    this.isRunning = false;
    this.timerSubscription.unsubscribe();
  }

  continueTimer() {
    if (!this.isRunning && this.time > 0) {
      this.startTimer();
    }
  }

  private formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  private pad(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}