import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imagePathSubject = new BehaviorSubject<string | null>(null);
  imagePath$ = this.imagePathSubject.asObservable();

  setImagePath(path: string) {
    this.imagePathSubject.next(path);
  }

  getImagePath(): string | null {
    return this.imagePathSubject.getValue();
  }
  clearImage(){
    this.imagePathSubject.next(null)
  }
}
