export interface Doctor {
    user_id: string;
    office_id: number;
    attended_cases: number;
    registered_date: Date;
  }
  
  export interface DoctorResponse {
    message: String;
    doctor: Doctor;
  }
  
  export interface DoctorsResponse {
    message: String;
    doctors: Doctor[];
  }