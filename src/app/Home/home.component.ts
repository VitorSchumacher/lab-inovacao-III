import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { RouterExtensions } from '@nativescript/angular';
import { requestPermissions, takePicture } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}

  onLogout() {
    this.authService.logout();
    this.routerExtensions.navigate(['/login'], { clearHistory: true });
  }

  takePicture() {
    requestPermissions()
      .then(() => {
        return takePicture({ saveToGallery: true });
      })
      .then((imageAsset) => {
        ImageSource.fromAsset(imageAsset).then((imageSource) => {
          console.log('Image taken: ', imageSource);
        });
      })
      .catch((err) => {
        console.error('Error -> ' + err.message);
      });
  }
}
