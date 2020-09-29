import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSidebarComponent } from './login-sidebar/login-sidebar.component';
import { CreateAccountFirstComponent } from './create-account-first/create-account-first.component';
import { CreateAccountSecondComponent } from './create-account-second/create-account-second.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSidebarComponent,
    CreateAccountFirstComponent,
    CreateAccountSecondComponent,
    NavbarComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AddressService, UserService],
  bootstrap: [AppComponent, 
    LoginSidebarComponent,
    CreateAccountFirstComponent,
    CreateAccountSecondComponent
  ]
})
export class AppModule { }
