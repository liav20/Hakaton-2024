import { HttpClient } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import game from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  groupNumber: number = 0;
  playersPerTeam : number = 0;


  constructor(private http: HttpClient){}
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
    const payload = { groupNumber, emails };
    console.log(payload);
    return this.http.post(`http://localhost:3000/api/game/matchMaking`, payload); 
  }
  
}
