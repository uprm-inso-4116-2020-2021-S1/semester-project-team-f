from api.util.config import db
from datetime import datetime
from api.dao.location import Location
from sqlalchemy.dialects.postgresql import UUID

class VisitedLocation(db.Model):
    REQUIRED_PARAMETERS = {'user_id', 'location_id', 'date_visited'}

    __tablename__ = 'visited_location'
    __table_args__ = ( db.UniqueConstraint('user_id', 'location_id', 'date_visited'), )

    user_id = db.Column(UUID(as_uuid = True), db.ForeignKey('user.user_id'), nullable = False, primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('location.location_id'), nullable = False, primary_key=True)
    date_visited = db.Column(db.Date, default=datetime.now(), primary_key=True)

    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.location_id = args.get('location_id')
        self.date_visited = args.get('date_visited')

    '''Value object: we have to search a specific visited location by it's attributes'''
    @staticmethod
    def getSpecificVisitedLocation(json):
        return VisitedLocation().query.filter_by(user_id=json['user_id'], location_id=json['location_id'], date_visited=json['date_visited'])

    '''Retrieve individuals who visited the location with the specified id'''
    @staticmethod
    def getVisitedLocationByLocationId(lid):
        return VisitedLocation().query.filter_by(location_id=lid)

    @staticmethod
    def getAllVisitedLocations():
        return VisitedLocation().query.all()

    @staticmethod
    def getLocationsVisitedByUserId(uid):
        return VisitedLocation().query.filter_by(user_id=uid).join(Location, Location.location_id==VisitedLocation.location_id).all()
    
    @staticmethod
    def getVisitedLocationsRelativeToAddress(aid):
        return VisitedLocation().query.join(Location, Location.location_id==VisitedLocation.location_id).filter_by(closest_address_id=aid).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def deleteVisitedLocation(json):
        visited_location = VisitedLocation.getSpecificVisitedLocation(json)
        if not visited_location:
            return None
        db.session.delete(visited_location)
        db.session.commit()
        return visited_location