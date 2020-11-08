export interface CovidCase {
    patient_id: string;
    doctor_id: string;
    office_id: number;
    date_tested?: string;
    tested_positive?: Boolean;
  }
  
  export interface CovidCaseResponse {
    message: String;
    case: CovidCase;
  }
  
  export interface CovidCasesResponse {
    message: String;
    cases: CovidCase[];
  }