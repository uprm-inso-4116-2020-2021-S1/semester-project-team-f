import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { MedicalOfficeService } from './services/medical-office.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSidebarComponent } from './login-sidebar/login-sidebar.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { AddressInformationComponent } from './address-information/address-information.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { AddPatientInformationComponent } from './add-patient-information/add-patient-information.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginSidebarComponent,
    ContactInformationComponent,
    AddressInformationComponent,
    NavbarComponent,
    MapComponent,
    AddPatientInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AddressService, UserService, MedicalOfficeService],
  bootstrap: [AppComponent, 
    LoginSidebarComponent,
    ContactInformationComponent,
    AddressInformationComponent
  ]
})
export class AppModule { }
