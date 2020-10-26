from api.util.config import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

class MedicalOffice(db.Model):
    __tablename__ = 'medical_office'
    office_id = db.Column(db.Integer, primary_key = True, nullable = False, unique=True)
    owner_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'), nullable=False)
    office_name = db.Column(db.String(50), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('location.location_id'), nullable=True)

    def __init__(self, **args):
        self.office_id = args.get('office_id')
        self.owner_id = args.get('owner_id')
        self.office_name = args.get('office_name')
        self.location_id = args.get('location_id')

    @staticmethod
    def getAllMedicalOffices():
        return MedicalOffice().query.all()

    @staticmethod
    def getMedicalOfficesbyOwnerId(oid):
        return MedicalOffice().query.filter_by(owner_id=oid).all()

    @staticmethod
    def getMedicalOfficeById(oid):
        return MedicalOffice().query.filter_by(office_id=oid).first()

    @staticmethod
    def getMedicalOfficeByAddressId(aid):
        return MedicalOffice().query.filter_by(address_id=aid).first()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self
