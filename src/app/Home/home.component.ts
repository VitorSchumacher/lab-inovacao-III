import { Component, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { RouterExtensions } from '@nativescript/angular';
import { requestPermissions, takePicture } from '@nativescript/camera';
import { ImageSource, isIOS, knownFolders, path } from '@nativescript/core';
import { ImageService } from '../Services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  capturedImagePath: string | null = null;
  imageSource: ImageSource | null = null;
  private authService = inject(AuthService);
  private routerExtensions = inject(RouterExtensions);
  private imageService = inject(ImageService);

  ngOnInit() {
    const imagePath = this.imageService.getImagePath();
    if (imagePath) {
      this.imageSource = ImageSource.fromFileSync(imagePath);
    }

    this.imageService.imagePath$.subscribe((path) => {
      if (path) {
        this.imageSource = ImageSource.fromFileSync(path);
        if(this.imageSource) {
          this.routerExtensions.navigate(['/face']);
        }
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.routerExtensions.navigate(['/login'], { clearHistory: true });
  }

  takePicture() {
    if (isIOS) {
      // Carrega uma imagem simulada para testes no simulador iOS
      ImageSource.fromFile("~/assets/foto-messi.jpg")
        .then((imageSource) => {
          this.saveImage(imageSource);
        })
        .catch((err) => {
          console.error('Error -> ' + err.message);
        });
    } else {
      requestPermissions()
        .then(() => takePicture({ saveToGallery: true }))
        .then((imageAsset) => ImageSource.fromAsset(imageAsset))
        .then((imageSource) => {
          this.saveImage(imageSource);
        })
        .catch((err) => {
          console.error('Error -> ' + err.message);
        });
    }
  }

  saveImage(imageSource: ImageSource) {
    const documentsFolder = knownFolders.documents();
    const folderPath = path.join(documentsFolder.path, 'images');

    // Cria a pasta se não existir
    const folder = documentsFolder.getFolder("images");

    const fileName = `captured-image-${new Date().getTime()}.jpg`;
    const filePath = path.join(folderPath, fileName);

    const saved = imageSource.saveToFile(filePath, 'jpg');

    if (saved) {
      this.capturedImagePath = filePath;
      this.imageService.setImagePath(filePath);
    } else {
      console.error('Failed to save image.');
    }
  }
}
