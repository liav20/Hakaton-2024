import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend-manager',
  standalone: true,
  imports: [FormsModule,
  CommonModule],
  templateUrl: './friend-manager.component.html',
  styleUrl: './friend-manager.component.css'
})
export class FriendManagerComponent {

  private _currentUserId: string = "";
  protected _friendEmail: string = "";
  private _currentUser: User | null = null;
  protected _friendList: string[] = [];

  ngOnInit() {
    this._currentUser = this._userService.getCurrentUser() as User;
    if (this._currentUser) {
      
      this._currentUserId = this._currentUser._id;
      this._userService.getFriendList(this._currentUserId).subscribe((data: string []) => {
        this._friendList = data;
      });

      this._currentUserId = this._currentUser._id;
      this._friendList = [...this._currentUser.friends];
      console.log(this._currentUser);
      console.log(this._currentUser.friends);
      console.log(this._friendList);
    }
  }

  
  constructor(private _userService: UserService,
    ) {}

  addFriend() {
    console.log(this._currentUserId, this._friendEmail);
    this._userService.addFriend(this._currentUserId, this._friendEmail).subscribe((data: any) => {

    }, (error: any) => {
      console.log(error);
    });
  }
  deleteFriend() {}

}
