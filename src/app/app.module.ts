import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'


import { appRoutes } from './routes';

import { ContentService } from './_services/content.service';

import { AppComponent } from './app.component';
import { GuitarComponent } from './_components/guitar/guitar.component';
import { RecipeComponent } from './_components/recipe/recipe.component';
import { MainComponent } from './_pages/main/main.component';
import { ErrorComponent } from './_pages/error/error.component';
import { VideoComponent } from './_components/video/video.component';
import { SocialsComponent } from './_components/socials/socials.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './CacheInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    GuitarComponent,
    RecipeComponent,
    MainComponent,
    ErrorComponent,
    VideoComponent,
    SocialsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    ],
    providers: [
      ContentService,
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
