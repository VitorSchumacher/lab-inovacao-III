import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}


  onLogout() {
    this.authService.logout();
    this.routerExtensions.navigate(['/login'],  { clearHistory: true });
  }
}
