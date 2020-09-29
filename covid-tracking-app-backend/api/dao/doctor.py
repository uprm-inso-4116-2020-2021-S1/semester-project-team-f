from api.util.config import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Doctor(db.Model):
    REQUIRED_PARAMETERS = {'user_id', 'office_id'}

    __tablename__ = 'doctor'
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'), nullable=False, primary_key=True)
    office_id = db.Column(db.Integer, db.ForeignKey('medical_office.office_id'), nullable=False)
    attended_cases = db.Column(db.Integer, default=0)
    registered_date = db.Column(db.Date, default=datetime.now())

    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.office_id = args.get('office_id')

    @staticmethod
    def getAllDoctors():
        return Doctor().query.all()

    @staticmethod
    def getDoctorById(did):
        return Doctor().query.filter_by(user_id=did).first()
    
    @staticmethod
    def getDoctorsByOffice(oid):
        return Doctor().query.filter_by(office_id=oid).all()

    @staticmethod
    def incrementAttendedCases(did):
        doctor = Doctor.getDoctorById(did)
        doctor.attended_cases +=1
        db.session.commit()
        return doctor

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self
