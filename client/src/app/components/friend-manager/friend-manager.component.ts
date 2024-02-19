import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import User from '../../models/user';

@Component({
  selector: 'app-friend-manager',
  standalone: true,
  imports: [],
  templateUrl: './friend-manager.component.html',
  styleUrl: './friend-manager.component.css'
})
export class FriendManagerComponent {

  private _currentUserId: string = "";
  private _friendEmail: string = "";
  private _currentUser: User | null = null;
  private _friendList: [] = [];

  ngOnInit() {
    this._currentUser = this._userService.getCurrentUser() as User;
    this._currentUserId = this._currentUser._id;
    console.log(this._currentUser);
    //this._friendList = this._currentUser.friends;
  }

  
  constructor(private _userService: UserService,
    private router: Router,
    private route:ActivatedRoute) {}

  addFriend() {
    this._userService.addFriend(this._currentUserId, this._friendEmail).subscribe((data: any) => {

    }, (error: any) => {
      console.log(error);
    });
  }
}
