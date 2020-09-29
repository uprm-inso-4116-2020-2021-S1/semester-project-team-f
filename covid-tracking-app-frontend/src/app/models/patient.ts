export interface Patient {
    patient_user_id: string;
    doctor_id: string;
    office_id: number;
    date_registered: Date;
    date_infected: Date;
    date_recovered: Date;
    has_covid: boolean;
    has_died: boolean;
  }
  
  export interface PatientResponse {
    message: String;
    patient: Patient;
  }
  
  export interface PatientsResponse {
    message: String;
    patients: Patient[];
  }