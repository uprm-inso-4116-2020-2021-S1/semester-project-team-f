from api.util.config import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

class MedicalOffice(db.Model):
    __tablename__ = 'medical_office'
    office_id = db.Column(db.Integer, primary_key = True, nullable = False)
    name = db.Column(db.String(50), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey('address.address_id'), nullable=False)
    attended_cases = db.Column(db.Integer, default=0)

    def __init__(self, **args):
        self.office_id = args.get('office_id')
        self.name = args.get('name')
        self.address_id = args.get('address_id')
        self.attended_cases = args.get('attended_cases')

    @staticmethod
    def getAllMedicalOffices():
        return MedicalOffice().query.all()

    @staticmethod
    def getMedicalOfficeById(mid):
        return MedicalOffice().query.filter_by(office_id=mid).first()

    @staticmethod
    def getMedicalOfficeByAddressId(aid):
        return MedicalOffice().query.filter_by(address_id=aid).first()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self
