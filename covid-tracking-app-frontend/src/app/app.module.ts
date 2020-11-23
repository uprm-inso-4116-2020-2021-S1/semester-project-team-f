import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { MedicalOfficeService } from './services/medical-office.service';
import { PatientService } from './services/patient.service';
import { CovidService } from './services/covid.service';
import { DoctorService } from './services/doctor.service';
import { LocationService } from './services/location.service';
import { VisitedLocationService } from './services/visited-location.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSidebarComponent } from './components/login-sidebar/login-sidebar.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AddressInformationComponent } from './components/address-information/address-information.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapComponent } from './components/map/map.component';
import { ManagePatientsComponent } from './components/manage-patients/manage-patients.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { HelpInfoComponent } from './components/help-info/help-info.component';
import { ManageCovidCasesComponent } from './components/manage-covid-cases/manage-covid-cases.component';
import { CovidResultsComponent } from './components/covid-results/covid-results.component';
import { OfficeInformationComponent } from './components/office-information/office-information.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ManageEmployeesComponent } from './components/manage-employees/manage-employees.component';
import { LocationInfoComponent } from './components/location-info/location-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSidebarComponent,
    ContactInformationComponent,
    AddressInformationComponent,
    NavbarComponent,
    MapComponent,
    ManagePatientsComponent,
    AccountSettingsComponent,
    HelpInfoComponent,
    ManageCovidCasesComponent,
    OfficeInformationComponent,
    MessageBoxComponent,
    ManageEmployeesComponent,
    CovidResultsComponent,
    LocationInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AddressService, 
    UserService, 
    MedicalOfficeService,
    PatientService, 
    CovidService,
    DoctorService, 
    LocationService,
    VisitedLocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
