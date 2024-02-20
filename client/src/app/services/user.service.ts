import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user'; // Adjust path as needed
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private url = 'http://localhost:3000/api/GetUser/';

  constructor(private httpClient: HttpClient) {
    let storedUserData;
  if (typeof window !== 'undefined') {
    storedUserData = localStorage.getItem('currentUser');
  }
  this.currentUserSubject = new BehaviorSubject<User | null>(storedUserData ? JSON.parse(storedUserData) : null);
  this.currentUser = this.currentUserSubject.asObservable();
}

  getUsers() {
    return this.httpClient.get(this.url);
  }
  
  getUser(id: string) {
    return this.httpClient.get<User>('http://localhost:3000/api/user/getInfo/'+ id);
  }

  postUser(user: User) {
    return this.httpClient.post('http://localhost:3000/api/auth/signUp/', user);
  }

  login(email: string, password: string) {
    // Presuming your login method returns the user object on successful authentication
    return this.httpClient.post<User>('http://localhost:3000/api/auth/signIn/', {email, password}).pipe(
      tap((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    // Clear user data from localStorage and reset currentUserSubject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  getFriendDetailsById(friendId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/friendDetails/${friendId}`);
  }
  getFriends(userId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/getFriends/${userId}`);
  }
  addFriend(id: string, email: string) {
    return this.httpClient.post('http://localhost:3000/api/user/addfriend/' + id, {email});
  }

  getFriendList(id: string) {
    return this.httpClient.get<string[]>('http://localhost:3000/api/user/getFriends/' + id);
  }
  removeFriend(id: string, email: string) {
    return this.httpClient.delete('http://localhost:3000/api/user/removeFriend/' + id, {params: {email}});

  }
  private updateLocalUserWithNewFriend(newFriend: any): void {
    // Retrieve the current user from localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser: User = JSON.parse(currentUserJson);

      // Add the new friend's email to the current user's friends list
      // Ensure that you are handling the structure correctly,
      // this might need to be adjusted based on how friends are stored
      currentUser.friends.push(newFriend.email);

      // Save the updated current user back to localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }
}
