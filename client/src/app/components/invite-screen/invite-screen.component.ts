import { Component ,EventEmitter,Input,OnDestroy,OnInit, Output} from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { Subscription } from 'rxjs';
import { HostScreenComponent } from '../host-screen/host-screen.component';

@Component({
  selector: 'app-invite-screen',
  standalone: true,
  imports: [CommonModule,HostScreenComponent],
  templateUrl: './invite-screen.component.html',
  styleUrl: './invite-screen.component.css'
})
export class InviteScreenComponent implements OnInit,OnDestroy {
  // friendsList: any[] = [];
  // isVisible: boolean = false;
  @Input() HostID: number | undefined;
  private subscriptions = new Subscription();
  gameId: string | undefined ;
  isVisable: boolean = false
  user : User | undefined;
  @Output() close = new EventEmitter<void>();


  constructor(private _gameservice: GameService, 
              private _userservice: UserService) { }

  closeInvite() {
 this.close.emit();
}


  ngOnInit() {
    this.subscriptions.add(
      this._userservice.currentUser.subscribe(user => {
        if (user) {
          this.user = user;
          console.log(this.user._id);
          if (this.user._id) {
            this._gameservice.getGameId(this.user._id.toString()).subscribe(data => {
              this.gameId = data.gameId; // Assuming the response structure { gameId: string }
              console.log(this.gameId);
            }, error => console.error('Error fetching game ID:', error));
          }
        }
      }, error => console.error('Error fetching user:', error))
    );
    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  openInviteScreen(): void {
    this.isVisable = true;
  }

  closeInviteScreen(): void {
    this.isVisable = false;
  }
 
  }
