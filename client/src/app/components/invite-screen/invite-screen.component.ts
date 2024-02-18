import { Component ,OnInit} from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

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

  gameId: string | undefined ;

  constructor(private _gameservice: GameService) { }

   ngOnInit(): void {
     this._gameservice.getGameId().subscribe(data => {
       this.gameId = data;
     });
    }

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
