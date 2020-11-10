from api.util.config import db
from api.dao.user import User
from api.dao.medical_office import MedicalOffice
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Patient(db.Model):
    REQUIRED_PARAMETERS = {'user_id', 'office_id'}

    __tablename__ = 'patient'
    __table_args__ = ( db.UniqueConstraint('user_id', 'office_id'), )

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'), nullable=False, primary_key=True)
    office_id = db.Column(db.Integer, db.ForeignKey('medical_office.office_id'), nullable=False, primary_key=True)
    date_registered = db.Column(db.Date, nullable=False)
    has_died = db.Column(db.Boolean, default=False)



    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.office_id = args.get('office_id')
        self.date_registered = args.get('date_registered')

    @staticmethod
    def getAllPatients():
        return Patient().query.all()

    @staticmethod
    def getPatientsByOfficeId(oid):
        return Patient().query.filter_by(office_id=oid)

    '''Retrieves a single individual that may have a record in multiple offices'''
    @staticmethod
    def getPatientById(pid):
        return Patient().query.filter_by(user_id=pid).all()


    '''Retrieves a specific patient record in an office'''
    @staticmethod
    def getPatientByOfficeAndUserId(oid, uid):
        return Patient().query.filter_by(user_id=uid, office_id=oid).first()

    @staticmethod
    def getDeathPatients():
        return Patient().query.filter_by(has_died=True).all()

    def create(self):
        self.date_registered = datetime.now()

        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def deletePatient(oid, uid):
        patient = Patient.getPatientByOfficeAndUserId(oid, uid)
        if not patient:
            return None
        db.session.delete(patient)
        db.session.commit()
        return patient