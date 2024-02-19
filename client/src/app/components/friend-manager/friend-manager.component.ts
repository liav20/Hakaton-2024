import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-manager',
  standalone: true,
  imports: [],
  templateUrl: './friend-manager.component.html',
  styleUrl: './friend-manager.component.css'
})
export class FriendManagerComponent {

  private _currentIserId: string = "";
  private _friendEmail: string = "";

  ngOnInit() {
    this._currentIserId = this._userService.getCurrentUser()?._id as string;
  }

  
  constructor(private _userService: UserService,
    private router: Router,
    private route:ActivatedRoute) {}

  addFriend() {
    this._userService.addFriend(this._currentIserId, this._friendEmail).subscribe((data: any) => {

    }, (error: any) => {
      console.log(error);
    });
  }
}
