import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable,switchMap } from 'rxjs';
import { NgxImageCompressService } from 'ngx-image-compress';
import {WebcamImage} from 'ngx-webcam';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private storage: Storage,private icom:NgxImageCompressService) {}

uploadImage(image: File, path: string): Observable<string> {
  return new Observable<string>((observer) => {
    this.compressImage(image).subscribe(res => {


      const storageRef = ref(this.storage, path);


      const uploadTask = from(uploadBytes(storageRef,this.dataURLtoBlob(res) ));
      uploadTask.subscribe(res => {


        if (res !== null) {
          getDownloadURL(res.ref).then(url => {


            observer.next(url);
            observer.complete();
          }).catch(err => {
     
            observer.error(err);
          });
        }
      }, err => {
      
        observer.error(err);
      });
    }, err => {
     
     
      observer.error(err);
    });
  });
}



cuploadImage(data: WebcamImage, path: string): Observable<string> {
  return new Observable<string>((observer) => {
      const storageRef = ref(this.storage, path);


     
                const uploadTask = from(uploadBytes(storageRef,this.dataURLtoBlob(data.imageAsDataUrl)));
      uploadTask.subscribe(res => {


        if (res !== null) {
          getDownloadURL(res.ref).then(url => {


            observer.next(url);
            observer.complete();
          }).catch(err => {
     
            observer.error(err);
          });
        }
      }, err => {
      
        observer.error(err);
      });
      

  });
}



      
convertToBlob(d:WebcamImage) {

    const imageDataUrl = d.imageAsDataUrl;
    
    const byteString = atob(imageDataUrl.split(',')[1]);
    const mimeType = imageDataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    
    const blob = new Blob([ab], { type: mimeType });
    return blob;
  }
}
    
  
compressImage(image: File): Observable<any> {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  return new Observable<any>((observer) => {
    reader.onload = (event: ProgressEvent) => {
      if (reader.result != null) {
    const options = {
      quality: 0.5, // Specify the image quality between 0 and 1
      maxWidth: 600,
      maxHeight: 600,
      autoRotate: true,
      debug: true
    };
        this.icom.compressFile(reader.result.toString(), -1, 50, 50).then(result => {
          observer.next(result);
          observer.complete();
        }).catch(error => {
          observer.error(error);
        });
      } else {
        observer.error('Failed to read file');
      }
    }
  });
}
convertBase64ToFile(base64Data: string, fileName: string): File {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: 'image/jpeg' });
}

dataURLtoBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

}
