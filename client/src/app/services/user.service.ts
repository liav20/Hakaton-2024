import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/api/GetUser';  
  httpClient: any;
  constructor(httpClient : HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.url);
  }
  
  getUser(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  postUser(password: string, email: string, username: string) {
    return this.httpClient.post('http://localhost:3000/api/auth/signUp', password, username, email);
  }
}
