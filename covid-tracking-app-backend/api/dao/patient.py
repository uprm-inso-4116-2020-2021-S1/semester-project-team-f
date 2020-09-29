from api.util.config import db
from api.dao.doctor import Doctor
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Patient(db.Model):
    REQUIRED_PARAMETERS = {'patient_user_id', 'doctor_id', 'office_id', 'has_covid'}

    __tablename__ = 'patient'
    patient_user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'), nullable=False, primary_key=True)
    doctor_id = db.Column(UUID(as_uuid=True), db.ForeignKey('doctor.user_id'), nullable=False)
    office_id = db.Column(db.Integer, db.ForeignKey('medical_office.office_id'), nullable=False)
    date_registered = db.Column(db.Date, default=datetime.now())
    date_infected = db.Column(db.Date, nullable=True)
    date_recovered = db.Column(db.Date, nullable=True)
    has_covid = db.Column(db.Boolean, nullable = False)
    has_died = db.Column(db.Boolean, nullable = True)

    def __init__(self, **args):
        self.patient_user_id = args.get('patient_user_id')
        self.doctor_id = args.get('doctor_id')
        self.office_id = args.get('office_id')
        self.date_registered = args.get('date_registered')
        self.date_infected = args.get('date_infected')
        self.date_recovered = args.get('date_recovered')
        self.has_covid = args.get('has_covid')

    @staticmethod
    def getAllPatients():
        return Patient().query.all()

    @staticmethod
    def getPatientById(pid):
        return Patient().query.filter_by(patient_id=pid).first()
    
    @staticmethod
    def getPatientsByDoctorId(did):
        return Patient().query.filter_by(doctor_id=did).all()

    @staticmethod
    def getPositiveCases():
        return Patient().query.filter_by(has_covid=True).all()

    @staticmethod
    def getNegativeCases():
        return Patient().query.filter_by(has_covid=False).all()

    @staticmethod
    def getNeverInfectedPatients():
        return Patient().query.filter_by(date_infected=None).all()

    @staticmethod
    def getRecoveredPatients():
        return Patient().query.filter_by(has_covid=False).filter_by(Patients.date_infected != None).all() #can be improved
    
    @staticmethod
    def classifyAsPositive(pid):
        patient = Patient.getPatientById(pid)
        patient.has_covid = True
        db.session.commit()
        return patient

    @staticmethod
    def classifyAsNegative(pid):
        patient = Patient.getPatientById(pid)
        patient.has_covid = False
        db.session.commit()
        return patient

    def create(self):
        db.session.add(self)
        db.session.commit()
        doctor = Doctor.incrementAttendedCases(self.doctor_id)
        return self