import { Component, OnInit, Type } from '@angular/core';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

type PatientRecord = Patient & User;

@Component({
  selector: 'app-add-patient-information',
  templateUrl: './add-patient-information.component.html',
  styleUrls: ['./add-patient-information.component.scss']
})

export class AddPatientInformationComponent implements OnInit {

  static medical_office: MedicalOffice
  patients: PatientRecord[]
  
  constructor(private patientsService: PatientService, private userService: UserService) { }

  ngOnInit(): void {
      this.showPatients();
   }

   public showPatients(): void{
    this.patients = [];

    this.patientsService.getPatientByOfficeId(AddPatientInformationComponent.medical_office.office_id).subscribe(patient_repsonse => {
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

  public returnToNavbar(): void{
    AddPatientInformationComponent.medical_office = null; 
    setTimeout(() => { AppComponent.exitAddOrRemovePatient(); }, 800); }

  public getOffice(): MedicalOffice{
    return AddPatientInformationComponent.medical_office;
  }

  public deletePatient(patient: PatientRecord){
    this.patientsService.deletePatient(patient).subscribe(res =>{
      if(res.message == "Success!"){
        console.log("The following patient record was deleted: ");
        console.log(patient);
        this.showPatients();
      }
    })
  }

  public addPatient(){
    let email = (<HTMLInputElement>document.querySelector('#inputEmail')).value;
    this.userService.getUserByIdOrEmail(email).subscribe(user_response => {
      if(user_response.message == "Success!"){
        let patient: Patient = {
          user_id: user_response.user.user_id,
          office_id: AddPatientInformationComponent.medical_office.office_id
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
    })
  }
}
