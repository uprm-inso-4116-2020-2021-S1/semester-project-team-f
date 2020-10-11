from api.util.config import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

class Location(db.Model):
    __tablename__ = 'location'
    location_id = db.Column(db.Integer, unique=True, nullable = False, primary_key=True)
    lattitude = db.Column(db.Float, nullable = False)
    longitude = db.Column(db.Float, nullable = False)
    closest_address_id = db.Column(db.Integer,  db.ForeignKey('address.address_id'), nullable = False)

    def __init__(self, **args):
        self.lattitude = args.get('lattitude')
        self.longitude = args.get('longitude')
        self.closest_address_id = args.get('closest_address_id')

    @property
    def pk(self):
        return self.location_id

    @staticmethod
    def getAllLocations():
        return Location().query.all()

    @staticmethod
    def getLocationById(lid):
        return Location().query.filter_by(user_id=lid).first()

    @staticmethod
    def getLocationByLattitudeAndLongitude(json):
        return Location().query.filter_by(lattitude = json['lattitude'], longitude = json['longitude']).first()
    
    @staticmethod
    def getLocationsRelativeToAddress(aid):
        return Location().query.filter_by(closest_address_id=aid).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self