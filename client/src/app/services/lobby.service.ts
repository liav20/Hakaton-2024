import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  joinGame(gameId: string, userId?: string): Observable<any> {
    const payload = userId ? { gameId, userId } : { gameId };
    return this.http.post(`${this.baseUrl}/JoinGame`, payload);
  }

  createLobby(gameId: string, hostId: string) {
    return this.http.post(`${this.baseUrl}/createLobby`, { gameId, hostId });
  }

  joinLobby(lobbyId: string, userId: string) {
    return this.http.post(`${this.baseUrl}/joinLobby`, { lobbyId, userId });
  }
}
