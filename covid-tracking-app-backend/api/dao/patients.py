from api.util.config import db


class Patients(db.Model):
    __tablename__ = 'patients'
    patient_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    date_registered = db.Column(db.Date, nullable=False)
    date_infected = db.Column(db.Date, nullable=True)
    date_recovered = db.Column(db.Date, nullable=True)
    has_covid = db.Column(db.Boolean, nullable = False)
    has_died = db.Column(db.Boolean, nullable = True)

    def __init__(self, **args):
        self.patient_id = args.get('patient_id')
        self.doctor_id = args.get('doctor_id')
        self.date_registered = args.get('date_registered')
        self.date_infected = args.get('date_infected')
        self.date_recovered = args.get('date_recovered')
        self.has_covid = args.get('has_covid')

    @property
    def pk(self):
        return self.patient_id

    @staticmethod
    def getAllPatients():
        return Patients().query.all()

    @staticmethod
    def getPatientById(pid):
        return Patients().query.filter_by(patient_id=pid).first()
    
    @staticmethod
    def getPatientsByDoctor(did):
        return Patients().query.filter_by(doctor_id=did).all()

    @staticmethod
    def getPositiveCases():
        return Patients().query.filter_by(has_covid=True).all()

    @staticmethod
    def getNegativeCases():
        return Patients().query.filter_by(has_covid=False).all()

    @staticmethod
    def getNeverInfectedPatients():
        return Patients().query.filter_by(date_infected=None).all()

    @staticmethod
    def getRecoveredPatients():
        return Patients().query.filter_by(has_covid=False).filter_by(Patients.date_infected != None).all() #can be improved