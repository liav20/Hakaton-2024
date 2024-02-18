import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user : User = new User(); 

  constructor(private userService: UserService) {}
    registerUser(){
      this.userService.post(this.user).subscribe((data: any) => {
        alert('Register')
      }, (error: any) => {
        console.log(error);
      });
    }
   }
    

