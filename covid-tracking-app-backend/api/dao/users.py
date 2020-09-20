from api.util.config import db

class Users(db.Model):
    REQUIRED_PARAMETERS = {'gender_id', 'address_id', 'full_name', 'birthdate', 'phone_number', 'email', 'password'}
    
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    gender_id = db.Column(db.Integer, nullable = False) #0 is male, 1 is female and 2 is non binary
    address_id = db.Column(db.Integer, db.ForeignKey('addresses.address_id'), nullable=False)
    full_name = db.Column(db.String(41), nullable=False)
    birthdate = db.Column(db.Date, nullable = False)
    phone_number = db.Column(db.Integer(11), nullable = False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    is_doctor = db.Column(db.Boolean, default=True)

    patient = db.relationship("Patients", foreign_keys='Patients.patient_id')
    doctor = db.relationship("Patients", foreign_keys='Patients.doctor_id')

    def __init__(self, **args):
        self.full_name = args.get('full_name')
        self.birthdate = args.get('birthdate')
        self.phone_number = args.get('phone_number')
        self.email = args.get('email')
        self.password = args.get('password')
        self.is_doctor = args.get('is_doctor')
        self.gender_id = args.get('gender_id')
        self.address_id = args.get('address_id')

    @property
    def pk(self):
        return self.user_id

    @staticmethod
    def getAllUsers():
        return Users().query.all()

    @staticmethod
    def getUsersByAddressId(aid):
        return Users().query.filter_by(address_id=aid).all()

    @staticmethod
    def getUsersByGender(gid):
        return Users().query.filter_by(gender_id=gid).all()

    @staticmethod
    def getUserById(uid):
        return Users().query.filter_by(user_id=uid).first()

    @staticmethod
    def getUserByEmail(uemail):
        return Users().query.filter_by(email=uemail).first()

    @staticmethod
    def getDoctors():
        return Users().query.filter_by(is_doctor=True).all()

    @staticmethod
    def getNonDoctors():
        return Users().query.filter_by(is_doctor=False).all()

    def createUser(self):
        db.session.add(self)
        db.session.commit()
        return self