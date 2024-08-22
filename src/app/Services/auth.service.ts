import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authKey = 'isLoggedIn';

  isAuthenticated(): boolean {
    return ApplicationSettings.getBoolean(this.authKey, false);
  }

  login() {
    ApplicationSettings.setBoolean(this.authKey, true);
  }

  logout() {
    ApplicationSettings.remove(this.authKey);
  }
}
