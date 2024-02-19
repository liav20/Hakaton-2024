import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteScreenComponent } from '../invite-screen/invite-screen.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AddToGameComponent } from '../add-to-game/add-to-game.component';

@Component({
  selector: 'app-host-screen',
  standalone: true,
  imports: [
    CommonModule,
    InviteScreenComponent,
    AddToGameComponent],
  templateUrl: './host-screen.component.html',
  styleUrl: './host-screen.component.css'
})
export class HostScreenComponent implements OnInit {
  numTeams: number = 0;
  playersPerTeam: number=0;
  hostId: any;
  total : number = 0; 
  showAddToGame: boolean = false;

  constructor(private _gameService: GameService,
    private router: Router,
    private activateroute:ActivatedRoute){}
  showInviteScreen: boolean = false;
  @Input() HostID: number | undefined;

    ngOnInit(): void {
      const setup = this._gameService.getGameSetup();
      this.numTeams = setup.numTeams;
      this.playersPerTeam = setup.playersPerTeam;
      this.total = this.numTeams * this.playersPerTeam;
    }
  

  openInviteScreen() {
    this.showInviteScreen = true;
  }

  // Method to hide the invite screen
  closeInviteScreen() {
    this.showInviteScreen = false;
  }
  gameMatch(){
    this._gameService.setGameSetup(this.numTeams, this.playersPerTeam)
    this.router.navigate(['/addtogame']);
  }
  toggleAddToGameModal(): void {
    this.showAddToGame = !this.showAddToGame;
  }
  

}
