import { Component, OnInit } from '@angular/core';
import { MedicalOffice } from '../models/medical_office';
import { CovidCase } from '../models/covid_case';
import { User } from '../models/user';
import { CovidService } from '../services/covid.service';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { MessageBoxComponent } from '../message-box/message-box.component';

type InfectedPatient = User & CovidCase;

@Component({
  selector: 'app-covid-cases',
  templateUrl: './covid-cases.component.html',
  styleUrls: ['./covid-cases.component.scss']
})

export class CovidCasesComponent implements OnInit {

  static medical_office: MedicalOffice
  statuses: string[]
  cases: InfectedPatient[]
  error: string;
  
  constructor(private covidService: CovidService, private userService: UserService, private patientService: PatientService) { }

  ngOnInit(): void {
      this.statuses = ['Pending', 'Negative', 'Positive']
      this.showCases();
   }

   public showCases(): void{
    this.cases = [];

    this.covidService.getCovidCasesByOfficeId(CovidCasesComponent.medical_office.office_id).subscribe(cases_repsonse => {
      for (let i = 0; i < cases_repsonse.cases.length; i++){
          let covid_case: CovidCase = cases_repsonse.cases[i];

          this.userService.getUserByIdOrEmail(covid_case.patient_id).subscribe(user_response => {
            let user: User = user_response.user;

            let infected_patient: InfectedPatient = {
              gender_id: user.gender_id,
              address_id:  user.address_id,
              full_name: user.full_name,
              birthdate: user.birthdate,
              phone_number: user.phone_number,
              email: user.email,
              office_id: covid_case.office_id,
              patient_id: covid_case.patient_id,
              doctor_id: covid_case.doctor_id,
              date_tested: covid_case.date_tested,
              test_status: covid_case.test_status
            }

            this.cases.push(infected_patient);
          });
      }
    });
   }

   public infectedPatientExists(): boolean{
     document.getElementById(this.cases[0].patient_id).classList.remove("active");
     let email: string = (<HTMLInputElement>document.querySelector("#inputEmail")).value;
     for(let i = 0; i < this.cases.length; i++){
       let patient : InfectedPatient = this.cases[i];
        if(patient.email == email){
          this.cases.splice(i,1);
          this.cases.unshift(patient);
          this.error = null;
          document.getElementById(this.cases[0].patient_id).classList.add("active");
          return true;
        }
     }
     this.error = "Email doesn't have registered case in this office."
     return false;
   }

  public returnToNavbar(): void{
    CovidCasesComponent.medical_office = null; 
    setTimeout(() => { AppComponent.exitManagingCovidCases(); }, 800); }

  public getOffice(): MedicalOffice{
    return CovidCasesComponent.medical_office;
  }

  public classifyTestResult(covid_case: InfectedPatient, result: string){
    let message = 'You just changed the test status to "' + result
    message+='". Are you sure you sure this is the test result? An email will be sent to the patient if you confirm the result.'
    MessageBoxComponent.confirmMessageBox(message, ()=>{

      let updated_case: CovidCase = {
        patient_id: covid_case.patient_id,
        doctor_id: covid_case.doctor_id,
        office_id: covid_case.office_id,
        date_tested: covid_case.date_tested,
        test_status: this.statuses.indexOf(result) + 1
      }

      this.covidService.updateRecord(updated_case).subscribe(res => {
        if(res.message == "Success!"){
          console.log("Test result was updated.");
          this.cases[this.cases.indexOf(covid_case)].test_status = updated_case.test_status;
        }
      });
    }
    );
  }

  public deleteCase(covid_case: InfectedPatient){
    this.covidService.deleteRecord(covid_case).subscribe(res =>{
      if(res.message == "Success!"){
        console.log("The following COVID-19 record was deleted: ");
        console.log(covid_case);
        let index = this.cases.indexOf(covid_case);
        this.cases.splice(index, 1);
      }
    });
  }

  public addCase(){
    let email = (<HTMLInputElement>document.querySelector('#inputEmail')).value;
    this.userService.getUserByIdOrEmail(email).subscribe(user_response => {
      if(user_response.message == "Success!"){
        this.error = null;

        let date: Date = new Date();

        let covid_case: CovidCase = {
          patient_id: user_response.user.user_id,
          doctor_id: DoctorService.loggedDoctorId,
          office_id: CovidCasesComponent.medical_office.office_id,
          date_tested: date.toDateString()
        };

        this.covidService.createRecord(covid_case).subscribe(covid_response => {
            if(covid_response.message == "Success!"){
              let user: User = user_response.user;

              let infected_patient: InfectedPatient = {
                gender_id: user.gender_id,
                address_id:  user.address_id,
                full_name: user.full_name,
                birthdate: user.birthdate,
                phone_number: user.phone_number,
                email: user.email,
                office_id: covid_case.office_id,
                patient_id: covid_case.patient_id,
                doctor_id: covid_case.doctor_id,
                date_tested: covid_case.date_tested,
                test_status: covid_case.test_status
              }
  
              this.cases.push(infected_patient);
            }
        }, err => this.error = err.error.reason);
      }
    }, err => this.error = err.error.reason
    );
  }

  public decodeCovidResult(patient: InfectedPatient): string{
    return this.statuses[patient.test_status - 1];
  }
}
