import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HostScreenComponent } from './components/host-screen/host-screen.component';
import { ScoreScreenComponent } from './components/score-screen/score-screen.component';
import { InviteScreenComponent } from './components/invite-screen/invite-screen.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { AddToGameComponent } from './components/add-to-game/add-to-game.component';
import { FriendManagerComponent } from './components/friend-manager/friend-manager.component';
import { EndGameComponent } from './components/end-game/end-game.component';



export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'host', component: HostScreenComponent},
    {path: 'score',component: ScoreScreenComponent},
    {path: 'invite', component: InviteScreenComponent},
    {path: 'lobby', component: LobbyCreateComponent},
    {path: 'addtogame',component: AddToGameComponent},
    {path: 'friends',component: FriendManagerComponent},
    {path: 'endgame', component: EndGameComponent}
];
