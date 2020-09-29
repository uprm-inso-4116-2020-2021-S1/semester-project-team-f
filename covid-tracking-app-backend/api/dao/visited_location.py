from api.util.config import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

class VisitedLocation(db.Model):
    __tablename__ = 'visited_location'
    lattitude = db.Column(db.Float, nullable = False)
    longitude = db.Column(db.Float, nullable = False)
    closest_address_id = db.Column(db.Integer,  db.ForeignKey('address.address_id'), nullable = False)
    user_id = db.Column(UUID(as_uuid = True), db.ForeignKey('user.user_id'), unique=True, nullable = False, primary_key=True)
    date_visited = db.Column(db.Date, nullable = False)

    def __init__(self, **args):
        self.lattitude = args.get('lattitude')
        self.longitude = args.get('longitude')
        self.closest_address_id = args.get('closest_address_id')
        self.user_id = args.get('user_id')
        self.date_visited = args.get('date_visited')

    @staticmethod
    def getAllVisitedLocations():
        return VisitedLocation().query.all()

    @staticmethod
    def getLocationsVisitedByUserId(uid):
        return VisitedLocation().query.filter_by(user_id=uid).all()
    
    @staticmethod
    def getVisitedLocationsRelativeToAddress(aid):
        return VisitedLocation().query.filter_by(closest_address_id=aid).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self