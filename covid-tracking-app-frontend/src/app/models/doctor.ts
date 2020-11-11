export interface Doctor {
    user_id: string;
    office_id: number;
    registered_date: string;
  }
  
  export interface DoctorResponse {
    message: String;
    doctor: Doctor[];
  }
  
  export interface DoctorsResponse {
    message: String;
    doctors: Doctor[];
  }