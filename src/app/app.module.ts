import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from '@angular/fire/auth-guard';


@NgModule({
  declarations: [AppComponent],
  imports: [ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebase), BrowserModule, IonicModule.forRoot(), AngularFireAuthModule, AppRoutingModule, HttpClientModule,FormsModule, provideAuth(() => getAuth()),],
  providers: [AuthGuard,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DataService,AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
