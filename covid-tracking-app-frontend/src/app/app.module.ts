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
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HelpInfoComponent } from './help-info/help-info.component';
import { ManageCovidCasesComponent } from './manage-covid-cases/manage-covid-cases.component';
import { CovidResultsComponent } from './covid-results/covid-results.component';

import { OfficeInformationComponent } from './office-information/office-information.component';
import { PatientService } from './services/patient.service';
import { CovidService } from './services/covid.service';
import { DoctorService } from './services/doctor.service';
import { LocationService } from './services/location.service';
import { VisitedLocationService } from './services/visited-location.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';

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
    CovidResultsComponent
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
