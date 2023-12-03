import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aveiro-Frontend';
  isRouteLoading: boolean;

  constructor(private router: Router) {
    this.isRouteLoading = false;
  }

  onRouteActivate() {
    this.isRouteLoading = true;
  }

  onRouteDeactivate() {
    this.isRouteLoading = false;
  }
}
