import { Component ,Input,OnInit} from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import User from '../../models/user';

@Component({
  selector: 'app-invite-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invite-screen.component.html',
  styleUrl: './invite-screen.component.css'
})
export class InviteScreenComponent  {
  // friendsList: any[] = [];
  // isVisible: boolean = false;
  @Input() HostID: number | undefined;

  gameId: string | undefined ;

  user : User | undefined;

  constructor(private _gameservice: GameService, 
              private _userservice: UserService) { }

  //  ngOnInit(): void {
  //    this._gameservice.postGameCreate('65d1de15e914c3271131dd4e').subscribe(data => {
  //      let temp = JSON.stringify(data);
  //      let temp2 = JSON.parse(temp);
  //      this.gameId = temp2._id;
  //    });
  //   }
  ngOnInit() {
    this._userservice.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user._id);
      
      this._gameservice.getGameId(this.user._id.toString()).subscribe(data => {
             let temp = JSON.stringify(data);
             let temp2 = JSON.parse(temp);
             this.gameId = temp2._id;
           });
    }})};
  

     copyGameIdToClipboard(): void {
      if (this.gameId) {
        navigator.clipboard.writeText(this.gameId).then(() => {
          alert('Game ID copied to clipboard!');
        }, (err) => {
          console.error('Could not copy text: ', err);
        });
      }
    }
  //   this._gameservice.getFriendsList().subscribe(data => {
  //     this.friendsList = data;
  //   });
  // }

  // openInviteScreen(): void {
  //   this.isVisible = true;
  // }

  // closeInviteScreen(): void {
  //   this.isVisible = false;
  // }
 
}
