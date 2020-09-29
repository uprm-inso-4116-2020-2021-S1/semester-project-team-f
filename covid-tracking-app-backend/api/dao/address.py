from api.util.config import db


class Address(db.Model):
    REQUIRED_PARAMETERS = {'country_name', 'region_name', 'street_address', 'city_name', 'zip_code'}

    __tablename__ = 'address'
    address_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String(55), nullable=False)
    region_name = db.Column(db.String(55), nullable=True)
    street_address = db.Column(db.String(95), nullable=False) 
    city_name = db.Column(db.String(28), nullable=False)
    zip_code = db.Column(db.String(6), nullable=False)

    user = db.relationship("User")

    def __init__(self, **args):
        self.country_name = args.get('country_name')
        self.region_name = args.get('region_name')
        self.street_address = args.get('street_address')
        self.city_name = args.get('city_name')
        self.zip_code = args.get('zip_code')

    @property
    def pk(self):
        return self.address_id

    @staticmethod
    def getAllAddresses():
        return Address().query.all()

    @staticmethod
    def getAddressesByCountry(cname):
        return Address().query.filter_by(country_name=cname).all()

    @staticmethod
    def getAddressesByRegion(rname):
        return Address().query.filter_by(region_name=rname).all()

    @staticmethod
    def getStreetAddresses(saddress):
        return Address().query.filter_by(street_address=saddress).all()

    @staticmethod
    def getAddressById(aid):
        return Address().query.filter_by(address_id=aid).first()

    @staticmethod
    def getSpecificAddress(json):
        return Address().query.filter_by(country_name=json['country_name'], region_name=json['region_name'],
         street_address=json['street_address'], city_name=json['city_name'], zip_code=json['zip_code']).first()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self