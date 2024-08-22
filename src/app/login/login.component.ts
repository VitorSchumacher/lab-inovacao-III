import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  onLogin() {
    if (this.username === "admin" && this.password === "admin") {
      this.authService.login();
      this.routerExtensions.navigate(["/home"], { clearHistory: true });
    } else {
      alert("Invalid username or password");
    }
  }
}
