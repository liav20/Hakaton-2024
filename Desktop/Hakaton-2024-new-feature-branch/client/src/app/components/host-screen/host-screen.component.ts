import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteScreenComponent } from '../invite-screen/invite-screen.component';

@Component({
  selector: 'app-host-screen',
  standalone: true,
  imports: [
    CommonModule,
    InviteScreenComponent
    ],
  templateUrl: './host-screen.component.html',
  styleUrl: './host-screen.component.css'
})
export class HostScreenComponent {

}
