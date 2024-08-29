import { Component, inject } from "@angular/core";
import { ImageService } from "../Services/image.service";
import { Device, ImageSource, Screen } from "@nativescript/core";
import { DetectionType, detectWithStillImage } from "@nativescript/mlkit-core";
import { FaceResult } from "@nativescript/mlkit-face-detection";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "app-home",
  templateUrl: "./faceRecognition.component.html",
  styleUrls: ["./faceRecognition.component.css"],
})
export class faceRecognitionComponent {
  imageSource: ImageSource | null = null;
  private imageService = inject(ImageService);
  private routerExtensions = inject(RouterExtensions);


  scale = Screen.mainScreen.scale;
  faceDetectionResult: {
    bounds: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };

  ngOnInit() {
    const imagePath = this.imageService.getImagePath();
    if (imagePath) {
      this.imageSource = ImageSource.fromFileSync(imagePath);
    }

    this.imageService.imagePath$.subscribe((path) => {
      if (path) {
        this.imageSource = ImageSource.fromFileSync(path);
        detectWithStillImage(this.imageSource, {
          detectorType: DetectionType.Face,
        }).then((algo) => {
          this.faceDetectionResult = algo?.face?.[0] as any;
        });
      }
    });
  }

  onSubmit() {
    this.imageService.clearImage()
    this.routerExtensions.navigate(['/home']);

  }
}
