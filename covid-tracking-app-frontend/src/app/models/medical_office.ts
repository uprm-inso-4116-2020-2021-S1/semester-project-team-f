export interface MedicalOffice {
  office_id: number;
  owner_id: number;
  office_name: string;
  location_id: number;
  office_phone_number: number;
}

export interface MedicalOfficeResponse {
  message: String;
  medical_office: MedicalOffice;
}

export interface MedicalOfficesResponse {
  message: String;
  medical_offices: MedicalOffice[];
}
