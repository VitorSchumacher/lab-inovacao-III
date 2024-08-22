import { inject, NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import {
  NativeScriptRouterModule,
  RouterExtensions,
} from "@nativescript/angular";
import { HomeComponent } from "./home/home.component";
import { ItemService } from "./item/item.service";
import { AuthService } from "./Services/auth.service";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(RouterExtensions);
        if (authService.isAuthenticated()) {
          router.navigate(["/home"], { clearHistory: true });
          return false;
        }
        return true;
      },
    ],
  },
  { path: "home", component: HomeComponent, canActivate: [
    () => {
      const authService = inject(AuthService);
      const router = inject(RouterExtensions);
      if (authService.isAuthenticated()) {
        return true;
      }
      router.navigate(["/login"], { clearHistory: true });
      return true;
    },
  ], },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
