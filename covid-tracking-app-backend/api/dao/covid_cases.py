from api.util.config import db
from api.dao.doctor import Doctor
from api.dao.patient import Patient
from api.dao.medical_office import MedicalOffice
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class CovidCases(db.Model):
    REQUIRED_PARAMETERS = {'patient_id', 'has_covid'}

    __tablename__ = 'covid_cases'
    patient_id = db.Column(UUID(as_uuid=True), db.ForeignKey('patient.patient_user_id'), nullable=False, primary_key=True)
    date_tested = db.Column(db.Date, default=datetime.now())
    date_recovered = db.Column(db.Date, nullable=True)
    has_covid = db.Column(db.Boolean, nullable = False)

    def __init__(self, **args):
        self.patient_id = args.get('patient_id')
        self.date_tested = args.get('date_tested')
        self.date_recovered = args.get('date_recovered')
        self.has_covid = args.get('has_covid')

    '''Assuming that the patient can get re-infected, then the following query will
       return the record of all the times that the patient got COVID-19, if any'''
    @staticmethod
    def getCasesByPatient(pid):
        return CovidCases().query.filter_by(patient_id=pid).all()

    '''Assuming that the patient can get re-infected, then the following query will
       return the most recent record of the patient that got COVID-19, if any'''
    @staticmethod
    def getMostRecentCaseByPatient(pid):
        return CovidCases().query.filter_by(patient_id=pid).last()

    '''Value object: we have to search a specific case by it's attributes'''
    @staticmethod
    def getSpecificCase(json):
        return CovidCases().query.filter_by(patient_id=json['patient_id'], date_tested=json['date_tested'], date_recovered=json['date_recovered'], has_covid=json['has_covid'])

    @staticmethod
    def getCumulativePositiveCases():
        return CovidCases().query.filter_by(has_covid=True).all()

    @staticmethod
    def getCurrentPositiveCases():
        return CovidCases().query.filter_by(has_covid=True, date_recovered=None).all()

    @staticmethod
    def getAllCases():
        return CovidCases().query.all()

    @staticmethod
    def getNegativeCases():
        return CovidCases().query.filter_by(has_covid=False).all()

    @staticmethod
    def getRecoveredCases():
        return CovidCases().query.filter_by(has_covid=False).filter_by(CovidCases.date_infected != None).all() #can be improved

    @staticmethod
    def classifyAsNegative(pid):
        patient_record = CovidCases.getMostRecentCaseByPatient(pid)

        if not patient_record.has_covid:
            patient_record.has_covid = False
            patient_record.date_recovered = datetime.now()
            
        db.session.commit()
        return patient_record

    def create(self):
        db.session.add(self)
        db.session.commit()
        patient = Patient.getPatientById(self.patient_id)
        doctor = Doctor.incrementAttendedCases(patient.doctor_id)
        office = MedicalOffice.incrementAttendedCases(patient.office_id)
        return self

    @staticmethod
    def deleteRecord(json):
        case = CovidCases.getSpecificCase(json)
        db.session.delete(case)
        db.session.commit()
        return case