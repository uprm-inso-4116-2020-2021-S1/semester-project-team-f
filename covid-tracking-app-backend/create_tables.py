from api.util.config import db
from api.dao.user import User
from api.dao.address import Address
from api.dao.location import Location
from api.dao.visited_location import VisitedLocation
from api.dao.medical_office import MedicalOffice
from api.dao.patient import Patient
from api.dao.doctor import Doctor
from api.dao.covid_cases import CovidCases


#run this to create the tables on pgadmin

db.drop_all()
db.create_all()