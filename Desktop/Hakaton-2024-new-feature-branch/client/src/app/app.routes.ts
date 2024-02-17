import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HostScreenComponent } from './components/host-screen/host-screen.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'host', component: HostScreenComponent}
];
