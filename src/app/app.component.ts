import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreatePinComponent} from "./shared/modules/create-pins/create-pin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pin-customers';
}
