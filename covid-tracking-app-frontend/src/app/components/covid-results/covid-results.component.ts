import { Component, OnInit } from '@angular/core';
import { CovidCase } from '../../models/covid_case';
import { MedicalOffice } from '../../models/medical_office';
import { CovidService } from '../../services/covid.service';
import { UserService } from '../../services/user.service';
import { MedicalOfficeService } from '../../services/medical-office.service';
import { AppComponent } from '../../app.component';
import { PatientService } from '../../services/patient.service';

type CaseInfo = MedicalOffice & CovidCase;

@Component({
  selector: 'app-covid-results',
  templateUrl: './covid-results.component.html',
  styleUrls: ['./covid-results.component.scss']
})
export class CovidResultsComponent implements OnInit {

  statuses: string[]
  cases: CaseInfo[]
  offices: MedicalOffice[]

  constructor(private covidService: CovidService, private officeService: MedicalOfficeService) { }

  ngOnInit(): void {
    this.statuses = ['Pending', 'Negative', 'Positive'];
    this.populateCases();
    this.populateOffices();
  }

  private populateCases(): void{
    this.cases = [];

    this.covidService.getCovidCasesByPatientId(UserService.loggedUser.user_id).subscribe(cases_repsonse => {
      for (let i = 0; i < cases_repsonse.cases.length; i++){
          let covid_case: CovidCase = cases_repsonse.cases[i];

          this.officeService.getMedicalOfficeById(covid_case.office_id).subscribe(office_response => {
            let office: MedicalOffice = office_response.medical_office;

            let case_info: CaseInfo = {
              office_name: office.office_name,
              location_id: office.location_id,
              office_phone_number: office.office_phone_number,
              owner_id: office.owner_id,
              office_id: covid_case.office_id,
              patient_id: covid_case.patient_id,
              doctor_id: covid_case.doctor_id,
              date_tested: new Date(covid_case.date_tested).toLocaleDateString('en-US', {timeZone: 'UTC'}),
              test_status: covid_case.test_status
            }

            this.cases.push(case_info);
          });
      }
    });
   }

   private populateOffices(): void{
     this.offices = []
     for(let oid of PatientService.patientAttendedOfficesId){
       this.officeService.getMedicalOfficeById(oid).subscribe(res => { this.offices.push(res.medical_office) })
     }
   }

  public returnToNavbar(){ AppComponent.exitViewPrevCovidTests(); }

  public decodeCovidResult(covid_case: CovidCase): string{
    return this.statuses[covid_case.test_status - 1];
  }
}
