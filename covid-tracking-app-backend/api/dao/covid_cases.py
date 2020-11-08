from api.util.config import db
from api.dao.doctor import Doctor
from api.dao.patient import Patient
from api.dao.medical_office import MedicalOffice
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class CovidCases(db.Model):
    REQUIRED_PARAMETERS = {'patient_id', 'doctor_id', 'office_id', 'date_tested'}

    __tablename__ = 'covid_cases'
    
    patient_id = db.Column(UUID(as_uuid=True), nullable=False, primary_key=True)
    doctor_id = db.Column(UUID(as_uuid=True), nullable=False)
    office_id = db.Column(db.Integer, nullable = False, primary_key=True)
    date_tested = db.Column(db.Date, nullable = False,  primary_key=True)
    tested_positive = db.Column(db.Boolean, nullable = True) #the test may take days to show the results

    __table_args__ = (db.ForeignKeyConstraint([patient_id, office_id], [Patient.user_id, Patient.office_id]),
                        db.ForeignKeyConstraint([doctor_id, office_id], [Doctor.user_id, Doctor.office_id]),
                        )

    def __init__(self, **args):
        self.patient_id = args.get('patient_id')
        self.doctor_id = args.get('doctor_id')
        self.office_id = args.get('office_id')
        self.date_tested = args.get('date_tested')
        self.tested_positive = args.get('tested_positive')

    '''Assuming that the patient can get re-infected, then the following query will
       return the record of all the times that the patient got COVID-19, if any
       
       NOTE: if an user gets tested in two different offices, then the following method will
       return the cases of that user by both offices
       '''
    @staticmethod
    def getCasesByPatient(pid):
        return CovidCases().query.filter_by(patient_id=pid).all()

    '''Assuming that the patient can get re-infected, then the following query will
       return the most recent record of the patient that got COVID-19, if any
       
       NOTE: if an user gets tested in two different offices, then the following method will
       return the most recent tested case in the latest office where the user
       got tested
       '''
    @staticmethod
    def getMostRecentCaseByPatient(pid):
        return CovidCases().query.filter_by(patient_id=pid).last()

    '''Value object: we have to search a specific case by it's attributes'''
    @staticmethod
    def getSpecificCase(json):
        return CovidCases().query.filter_by(patient_id=json['patient_id'], office_id=json['office_id'], date_tested=json['date_tested']).first()

    @staticmethod
    def getCumulativePositiveCases():
        return CovidCases().query.filter_by(has_covid=True).all()

    @staticmethod
    def getAllCases():
        return CovidCases().query.all()

    @staticmethod
    def getNegativeCases():
        return CovidCases().query.filter_by(has_covid=False).all()

    '''Tests realized by X doctor'''
    @staticmethod
    def getCasesByDoctor(did):
        return CovidCases().query.filter_by(doctor_id=did).all()

    '''Tests realized by X office'''
    @staticmethod
    def getCasesByOffice(oid):
        return CovidCases().query.filter_by(office_id=oid).all()

    '''Tests realized by X doctor in Y office'''
    @staticmethod
    def getCasesByDoctorAndOffice(json):
        return CovidCases().query.filter_by(doctor_id = json['doctor_id'], office_id=json['office_id']).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def updateCovidStatus(json):
        covid_case = CovidCases.getSpecificCase(json)
        covid_case.tested_positive = json['tested_positive']
        db.session.commit()
        return covid_case

    @staticmethod
    def deleteRecord(json):
        case = CovidCases.getSpecificCase(json)
        db.session.delete(case)
        db.session.commit()
        return case