from api.util.config import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Doctor(db.Model):
    REQUIRED_PARAMETERS = {'user_id', 'office_id'}

    __tablename__ = 'doctor'
    __table_args__ = ( db.UniqueConstraint('user_id', 'office_id'), )

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'), nullable=False, primary_key=True)
    office_id = db.Column(db.Integer, db.ForeignKey('medical_office.office_id'), nullable=False, primary_key=True)
    registered_date = db.Column(db.Date, nullable=False, default=datetime.now())

    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.office_id = args.get('office_id')
        self.registered_date = args.get('registered_date')

    @staticmethod
    def getAllDoctors():
        return Doctor().query.all()

    @staticmethod
    def getDoctorByUserId(did):
        return Doctor().query.filter_by(user_id=did).all()
    
    @staticmethod
    def getDoctorsByOfficeId(oid):
        return Doctor().query.filter_by(office_id=oid).all()

    '''Retrieves a specific doctor in an office'''
    @staticmethod
    def getDoctorByOfficeAndUserId(oid, uid):
        return Doctor().query.filter_by(user_id=uid, office_id=oid).first()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def deleteDoctor(oid, uid):
        doctor = Doctor.getDoctorByOfficeAndUserId(oid, uid)
        if not doctor:
            return None
        db.session.delete(doctor)
        db.session.commit()
        return doctor
