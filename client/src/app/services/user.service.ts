import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/api/GetUser/';  
  httpClient: any;
  constructor(httpClient : HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.url);
  }
  
  get(id: number) {
    return this.httpClient.get(this.url + id);
  }

  post(user: User) {
    return this.httpClient.post('http://localhost:3000/api/auth/signUp/', user);
  }
}
