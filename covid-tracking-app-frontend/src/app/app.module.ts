import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSidebarComponent } from './login-sidebar/login-sidebar.component';
import { CreateAccountFirstComponent } from './create-account-first/create-account-first.component';
import { CreateAccountSecondComponent } from './create-account-second/create-account-second.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSidebarComponent,
    CreateAccountFirstComponent,
    CreateAccountSecondComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, 
    LoginSidebarComponent,
    CreateAccountFirstComponent,
    CreateAccountSecondComponent
  ]
})
export class AppModule { }
