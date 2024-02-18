import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    imageUrl: string = 'https://www.peakpx.com/en/hd-wallpaper-desktop-kqeiw';
    email: string ="";
    password: string ="";
    loggedin: boolean = false;

    users: User []= [];

    constructor(private _userService: UserService,
                private router: Router){}

  loginuser(){
    this._userService.login(this.email,this.password)
      alert('login successful');
      this.router.navigate(['/home']);
    };
  }
