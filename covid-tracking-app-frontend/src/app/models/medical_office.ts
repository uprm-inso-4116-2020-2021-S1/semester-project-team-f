export interface MedicalOffice {
    office_id: number;
    owner_id: number;
    office_name: string;
    address_id: number;
    attended_cases: number;
  }
  
  export interface MedicalOfficeResponse {
    message: String;
    medical_office: MedicalOffice;
  }
  
  export interface MedicalOfficesResponse {
    message: String;
    medical_offices: MedicalOffice[];
  }