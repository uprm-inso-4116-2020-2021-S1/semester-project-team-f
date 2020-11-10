import { Component, OnInit, Type } from '@angular/core';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

type PatientRecord = Patient & User;

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss']
})

export class ManagePatientsComponent implements OnInit {

  static medical_office: MedicalOffice
  patients: PatientRecord[]
  error: string;
  
  constructor(private patientsService: PatientService, private userService: UserService) { }

  ngOnInit(): void {
      this.showPatients();
   }

   public showPatients(): void{
    this.patients = [];

    this.patientsService.getPatientsByOfficeId(ManagePatientsComponent.medical_office.office_id).subscribe(patient_repsonse => {
      for (let i = 0; i < patient_repsonse.patients.length; i++){
          let patient: Patient = patient_repsonse.patients[i];

          this.userService.getUserByIdOrEmail(patient.user_id).subscribe(user_response => {
            let user: User = user_response.user;

            let patient_to_add: PatientRecord = {
              user_id: user.user_id,
              gender_id: user.gender_id,
              address_id:  user.address_id,
              full_name: user.full_name,
              birthdate: user.birthdate,
              phone_number: user.phone_number,
              email: user.email,
              office_id: patient.office_id,
              date_registered: patient.date_registered,
              has_died: patient.has_died
            }

            this.patients.push(patient_to_add);
          });
      }
    });
   }

   public searchPatient(): boolean{
     document.getElementById(this.patients[0].user_id).classList.remove("active");
     let email: string = (<HTMLInputElement>document.querySelector("#inputEmail")).value;
     for(let i = 0; i < this.patients.length; i++){
       let patient : PatientRecord = this.patients[i];
        if(patient.email == email){
          this.patients.splice(i,1);
          this.patients.unshift(patient);
          this.error = null;
          document.getElementById(this.patients[0].user_id).classList.add("active");
          return true;
        }
     }
     this.error = "Email is not registered in this office.";
     return false;
   }

  public returnToNavbar(): void{
    ManagePatientsComponent.medical_office = null; 
    AppComponent.exitAddOrRemovePatient(); 
  }

  public getOffice(): MedicalOffice{
    return ManagePatientsComponent.medical_office;
  }

  public deletePatient(patient: PatientRecord){
    this.patientsService.deletePatient(patient.office_id, patient.user_id).subscribe(res =>{
      if(res.message == "Success!"){
        console.log("The following patient record was deleted: ");
        console.log(patient);
        let index = this.patients.indexOf(patient);
        this.patients.splice(index, 1);
      }
    }, err => this.error = err.error.reason);
  }

  public addPatient(){
    let email = (<HTMLInputElement>document.querySelector('#inputEmail')).value;
    this.userService.getUserByIdOrEmail(email).subscribe(user_response => {
      if(user_response.message == "Success!"){
        this.error = null;

        let patient: Patient = {
          user_id: user_response.user.user_id,
          office_id: ManagePatientsComponent.medical_office.office_id
        }
        this.patientsService.createPatient(patient).subscribe(patient_response => {
            if(patient_response.message == "Success!"){
              let user: User = user_response.user;

              let patient_to_add: PatientRecord = {
                user_id: user.user_id,
                gender_id: user.gender_id,
                address_id:  user.address_id,
                full_name: user.full_name,
                birthdate: user.birthdate,
                phone_number: user.phone_number,
                email: user.email,
                office_id: patient.office_id,
                date_registered: patient.date_registered,
                has_died: patient.has_died
              }
  
              this.patients.push(patient_to_add);
            }
        });
      }
    }, err => this.error = "Email does not exist. Make sure that the patient registers as a regular user first.");
  }
}
