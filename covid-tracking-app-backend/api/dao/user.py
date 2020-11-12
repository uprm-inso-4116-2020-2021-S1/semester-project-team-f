from api.util.config import db
from api.util.config import app
from sqlalchemy.dialects.postgresql import UUID
import uuid
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

class User(db.Model):
    REQUIRED_PARAMETERS = {'gender_id', 'address_id', 'full_name', 'birthdate', 'phone_number', 'email', 'password', 'active' }
    
    __tablename__ = 'user'
    user_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    gender_id = db.Column(db.Integer, nullable = False) #0 is male, 1 is female and 2 is non binary
    address_id = db.Column(db.Integer, db.ForeignKey('address.address_id'), nullable=False)
    full_name = db.Column(db.String(41), nullable=False)
    birthdate = db.Column(db.Date, nullable = False)
    phone_number = db.Column(db.String(13), nullable = False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default =False)

    patient = db.relationship("Patient", foreign_keys='Patient.user_id')
    doctor = db.relationship("Doctor", foreign_keys='Doctor.user_id')

    def __init__(self, **args):
        self.full_name = args.get('full_name')
        self.birthdate = args.get('birthdate')
        self.phone_number = args.get('phone_number')
        self.email = args.get('email')
        self.password = args.get('password')
        self.gender_id = args.get('gender_id')
        self.address_id = args.get('address_id')
        self.active = args.get("active")
    
    def get_user_token(self, expires_sec=1800):
        s = Serializer(app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'email': self.email}).decode('utf-8')
    
    @staticmethod
    def verify_user_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            email = s.loads(token)['email']
        except:
            return None
        return email

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

    
    def activateUser(self):
        self.active = True
        db.session.commit()
        return self

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self