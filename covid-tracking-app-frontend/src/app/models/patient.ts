export interface Patient {
    user_id: string;
    office_id: number;
    date_registered?: Date;
    has_died?: boolean;
  }
  
  export interface PatientResponse {
    message: String;
    patient: Patient;
  }
  
  export interface PatientsResponse {
    message: String;
    patients: Patient[];
  }