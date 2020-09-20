from api.util.config import db


class Addresses(db.Model):
    __tablename__ = 'addresses'
    address_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String(55), nullable=False)
    region_name = db.column(db.String(55), nullable=True)
    street_address = db.Column(db.String(95), nullable=False) 
    city = db.Column(db.String(28), nullable=False)
    zip_code = db.column(db.Integer(6), nullable=False)

    user = db.relationship("Users")

    def __init__(self, **args):
        self.country_name = args.get('country_name')
        self.region_name = args.get('region_name')
        self.street_address = args.get('street_address')
        self.city = args.get('city')
        self.zip_code = args.get('zip_code')

    @property
    def pk(self):
        return self.address_id

    @staticmethod
    def getAddresses():
        return Addresses().query.all()

    @staticmethod
    def getAddressesByCountry(cname):
        return Addresses().query.filter_by(country_name=cname).all()

    @staticmethod
    def getAddressesByRegion(rname):
        return Addresses().query.filter_by(region_name=rname).all()

    @staticmethod
    def getStreetAddresses(saddress):
        return Addresses().query.filter_by(street_address=saddress).all()

    @staticmethod
    def getAddressById(aid):
        return Addresses().query.filter_by(address_id=aid).first()