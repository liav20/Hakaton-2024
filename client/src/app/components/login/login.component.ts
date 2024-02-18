import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
      if (response.hasOwnProperty('_id')) {
        this.router.navigate(['/home']);
      }
      else {
        alert('error');
      }
    })
  }


}
