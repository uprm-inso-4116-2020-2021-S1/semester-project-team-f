export interface CovidCase {
    patient_id: string;
    doctor_id: string;
    office_id: number;
    date_tested?: string;
    test_status?: number;
  }
  
  export interface CovidCaseResponse {
    message: String;
    case: CovidCase;
  }
  
  export interface CovidCasesResponse {
    message: String;
    cases: CovidCase[];
  }