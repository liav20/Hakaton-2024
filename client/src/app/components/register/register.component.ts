import { Component } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user:User = new User();
  constructor(private _userService : UserService) {}
  registeruser(){
    this._userService.postUser(this.user).subscribe((data: any)=>{
      alert("User registed successfully");
    },(error: any )=>{
      console.log(error);
    })
  }

}

