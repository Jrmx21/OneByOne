import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy} from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '@angular/fire/auth-guard';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    
  ],
  providers: [
    CookieService,
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
