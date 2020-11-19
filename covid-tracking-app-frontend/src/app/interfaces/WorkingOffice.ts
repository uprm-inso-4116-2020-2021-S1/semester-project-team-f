import{ MedicalOffice } from '../models/medical_office'

export interface WorkingOffice{
    satisfyCondition:  (medical_office: MedicalOffice) => boolean,
    doAction: (medical_office: MedicalOffice) => void
}