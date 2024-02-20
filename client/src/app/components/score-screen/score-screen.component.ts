import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';

interface Team {
  name: string;
  points: number;
  colorAsHex: string;
}

interface Elements {
  marqueeLetters: HTMLElement[];
  teams: { [key: string]: HTMLElement };
}

@Component({
  selector: 'app-score-screen',
  standalone: true,
  imports: [TimerComponent,CommonModule],
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.css']
})
export class ScoreScreenComponent implements OnInit {
  private teamMap: { [key: string]: Team } = {};
  private messagesConnectionErrors: number = 0;
  private elements?: Elements;

  

  private winner: Team | null = null;

  ngOnInit(): void {
    this.teamMap = this.parseTextContent(this.$('#serialized-team-map'));
    this.elements = this.getElements(Object.values(this.teamMap));
    this.setupMessages();
  }

  private $(selectors: string): HTMLElement | null {
    return document.querySelector(selectors);
  }

  private $$(selectors: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selectors);
  }

  private getElements(teamList: Team[]): Elements {
    const marqueeLetters = Array.from(this.$$('.marquee__letter'));
    const teams = teamList.reduce((acc, team) => {
      acc[team.name] = this.$(`.points__team--${team.name}`) as HTMLElement;
      return acc;
    }, {} as { [key: string]: HTMLElement });

    return { marqueeLetters, teams };
  }

  private parseTextContent(element: HTMLElement | null): { [key: string]: Team } {
    if (!element) return {};
    return JSON.parse(element.textContent || '{}');
  }

  private setupMessages(): void {
    // Simplified: Replace with your actual message setup logic
    const messages = new EventTarget();

    messages.addEventListener('team', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.update(JSON.parse(customEvent.detail));
    });

    // Additional setup for open, error, etc.
  }

  private update(team: Team): void {
    // Update logic here
  }

  private async animate(team: Team): Promise<void> {
    // Animation logic here
  }

  // Additional methods for handling user actions, etc.
}
