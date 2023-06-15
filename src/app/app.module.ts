import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ImageUploadService} from './services/image-upload.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './components/profile/profile.component';
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DatePipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CodingComponent } from './components/coding/coding.component';
import { SwUpdate } from '@angular/service-worker';
import {HttpClientModule} from '@angular/common/http';
import {SaveService} from './services/save.service';
import {UsersService} from './services/users.service';
import {MatIconModule} from '@angular/material/icon';
import {LazyLoadImagesModule} from 'ngx-lazy-load-images';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import {WebcamModule} from 'ngx-webcam';
import {Camera} from './components/home/home.component';

@NgModule({
   declarations: [
    AppComponent,
    LoginComponent,
      Camera,
    HomeComponent,
    LandingComponent,
    SignUpComponent,
    ProfileComponent,
    DateDisplayPipe,
    CodingComponent,
  ],
  imports: [
    BrowserModule,
      WebcamModule,
        FormsModule
      ,

      BrowserAnimationsModule,
      MatBottomSheetModule,
    MatToolbarModule,
      LazyLoadImagesModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
      MatIconModule,
      MatDialogModule,
    AppRoutingModule,
      HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
      
      
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first)
    }),
    provideMessaging(() => getMessaging()),
  ],
  providers: [DatePipe,ImageUploadService,SaveService,UsersService],
      exports: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
          constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
window.location.reload();
      });
    }
  }
}
