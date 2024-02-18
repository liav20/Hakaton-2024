import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/api/GetUser/';  
  constructor(private httpClient : HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.url);
  }
  
  getUser(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  postUser(user: User) {
    return this.httpClient.post('http://localhost:3000/api/auth/signUp/',user);
  }
  login(email: string, password: string) {
    return this.httpClient.post('http://localhost:3000/api/auth/signIn/',{email:email,password:password});
  }
}
