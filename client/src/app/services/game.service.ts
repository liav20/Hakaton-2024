import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import game from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient){}
  getGameId(): Observable<any> {
    return this.http.get('http://localhost:3000/api/game/creategame/'); // Adjust URL as needed
  }

  getFriendsList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/game/friends/'); // Adjust URL as needed
  }
}
