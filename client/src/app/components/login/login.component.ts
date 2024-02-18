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

                loginUser() {
                  this._userService.login(this.tempUser.email, this.tempUser.password).subscribe((response: any) => {
                    if (response && response._id) { // Assuming _id is a property of the user object
                      this._userService.setCurrentUser(response); // Store the user details
                      this.router.navigate(['/home']);
                    } else {
                      alert('Login failed. Please check your credentials.');
                    }
                  }, error => {
                    console.error('Login error:', error);
                    alert('An error occurred during login.');
                  });
                }


}
