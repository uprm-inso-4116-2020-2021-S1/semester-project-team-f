from api.util.config import db
from datetime import datetime
from api.dao.location import Location
from sqlalchemy.dialects.postgresql import UUID

class VisitedLocation(db.Model):
    __tablename__ = 'visited_location'
    user_id = db.Column(UUID(as_uuid = True), db.ForeignKey('user.user_id'), unique=True, nullable = False, primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('location.location_id'), nullable = False)

    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.location_id = args.get('location_id')

    @staticmethod
    def getAllVisitedLocations():
        return VisitedLocation().query.all()

    @staticmethod
    def getLocationsVisitedByUserId(uid):
        return VisitedLocation().query.join(Location, Location.location_id==VisitedLocation.location_id).filter_by(user_id=uid).all()
    
    @staticmethod
    def getVisitedLocationsRelativeToAddress(aid):
        return VisitedLocation().query.join(Location, Location.location_id==VisitedLocation.location_id).filter_by(closest_address_id=aid).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self