from api.util.config import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(db.Model):
    REQUIRED_PARAMETERS = {'gender_id', 'address_id', 'full_name', 'birthdate', 'phone_number', 'email', 'password'}
    
    __tablename__ = 'user'
    user_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    gender_id = db.Column(db.Integer, nullable = False) #0 is male, 1 is female and 2 is non binary
    address_id = db.Column(db.Integer, db.ForeignKey('address.address_id'), nullable=False)
    full_name = db.Column(db.String(41), nullable=False)
    birthdate = db.Column(db.Date, nullable = False)
    phone_number = db.Column(db.String(11), nullable = False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(128), nullable=False)

    patient = db.relationship("Patient", foreign_keys='Patient.patient_user_id')
    doctor = db.relationship("Doctor", foreign_keys='Doctor.user_id')

    def __init__(self, **args):
        self.full_name = args.get('full_name')
        self.birthdate = args.get('birthdate')
        self.phone_number = args.get('phone_number')
        self.email = args.get('email')
        self.password = args.get('password')
        self.gender_id = args.get('gender_id')
        self.address_id = args.get('address_id')

    @property
    def pk(self):
        return self.user_id

    @staticmethod
    def getAllUsers():
        return User().query.all()

    @staticmethod
    def getUsersByAddressId(aid):
        return User().query.filter_by(address_id=aid).all()

    @staticmethod
    def getUsersByGender(gid):
        return User().query.filter_by(gender_id=gid).all()

    @staticmethod
    def getUserById(uid):
        return User().query.filter_by(user_id=uid).first()

    @staticmethod
    def getUserByEmail(uemail):
        return User().query.filter_by(email=uemail).first()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self