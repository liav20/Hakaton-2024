import { HttpClient } from '@angular/common/http';
import { Host, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import game from '../models/game';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { url } from 'inspector';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  groupNumber: number = 0;
  playersPerTeam : number = 0;
  private teamsSubject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('teams') || '[]'));
  private totalScoresSubject = new BehaviorSubject<number[]>(JSON.parse(localStorage.getItem('totalScores') || '[]'));
  private score = new BehaviorSubject<{ home: number, away: number }>({ home: 0, away: 0 });
  private timeLeft = new BehaviorSubject<number>(8 * 60);



  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object){
    if (isPlatformBrowser(this.platformId)) {
      // Initialize with data from localStorage, if available
      const teams = JSON.parse(localStorage.getItem('teams') || '[]');
      const totalScores = JSON.parse(localStorage.getItem('totalScores') || '[]');
      this.teamsSubject.next(teams);
      this.totalScoresSubject.next(totalScores);
    }
  }
  getGameId(hostID: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/game/getGameId/' + hostID.toString()); // Adjust URL as needed
  }

  getFriendsList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/game/friends/'); // Adjust URL as needed
  }

  postGameCreate(hostID: string){
    return this.http.post('http://localhost:3000/api/game/creategame/' + hostID.toString(), hostID);
  }

  postEndGame(gameID: string, body: any){
    return this.http.put('http://localhost:3000/api/game/EndGame/' + gameID.toString(), body);
  }

  setGameSetup(numTeams: number, playersPerTeam: number) {
    this.groupNumber = numTeams;
    this.playersPerTeam = playersPerTeam;
  }

  getGameSetup() {
    return {
      numTeams: this.groupNumber,
      playersPerTeam: this.playersPerTeam,
    };
  }
  sendInvites(groupNumber: number, emails: string[]): Observable<any> {
    const url = 'http://localhost:3000/api/game/matchMaking'; // Replace with your server endpoint
    return this.http.post(url, { groupNumber, emails }).pipe(
      tap((response: any) => {
        // Directly set teams and scores from the response
        this.setTeamsAndScores(response.teams, response.totalScores);
      })
    );
  }
  setTeamsAndScores(teams: any[], totalScores: number[]): void {
    this.teamsSubject.next(teams);
    this.totalScoresSubject.next(totalScores);
        localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('totalScores', JSON.stringify(totalScores));
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('teams', JSON.stringify(teams));
      localStorage.setItem('totalScores', JSON.stringify(totalScores));
    }

  }
  
  // getTeamsObservable(): Observable<any[]> {
  //   return this.teamsSubject.asObservable();
  // }

  // getTotalScoresObservable(): Observable<number[]> {
  //   return this.totalScoresSubject.asObservable();
  // }


  getTeams(emails: string[], groupNumber: number): Observable<any> {
    const url = 'http://localhost:3000/api/game/matchMaking'; // Adjust your server's URL accordingly
    return this.http.post(url, { emails, groupNumber });
  }

  private getFromLocalStorage(key: string, defaultValue: any): any {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : defaultValue;
    }
    return defaultValue;
  }
  private saveToLocalStorage(key: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  getTeamsObservable(): Observable<any[]> {
    return this.teamsSubject.asObservable();
  }

  getTotalScoresObservable(): Observable<number[]> {
    return this.totalScoresSubject.asObservable();
  }

}
