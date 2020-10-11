from api.util.config import db
from api.dao.doctor import Doctor
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Patient(db.Model):
    REQUIRED_PARAMETERS = {'patient_user_id', 'doctor_id', 'office_id'}

    __tablename__ = 'patient'
    patient_user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'), nullable=False, primary_key=True)
    doctor_id = db.Column(UUID(as_uuid=True), db.ForeignKey('doctor.user_id'), nullable=False)
    office_id = db.Column(db.Integer, db.ForeignKey('medical_office.office_id'), nullable=False)
    date_registered = db.Column(db.Date, default=datetime.now())
    has_died = db.Column(db.Boolean, nullable = True)

    def __init__(self, **args):
        self.patient_user_id = args.get('patient_user_id')
        self.doctor_id = args.get('doctor_id')
        self.office_id = args.get('office_id')
        self.date_registered = args.get('date_registered')

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
    def getDeathPatients():
        return Patient().query.filter_by(has_died=True).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self