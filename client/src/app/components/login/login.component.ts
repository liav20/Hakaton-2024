import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
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

    tempUser = new User();
    loggedin: boolean = false;

    users: User []= [];

    constructor(private _userService: UserService,
                private router: Router){}

  loginUser(){
    this._userService.login(this.tempUser.email,this.tempUser.password).subscribe((response) =>{
      console.log(this.tempUser.email,this.tempUser.password);
      alert(this.tempUser.email)
      alert(this.tempUser.password)
      console.log(response);
      alert(response);
    })
  }


}
