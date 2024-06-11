import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ProxycapturePageComponent } from './Pages/proxycapture-page/proxycapture-page.component';
import { NavbarComponent } from './Components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavbarComponent,ProxycapturePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProxyCapture-Frontend';
}
