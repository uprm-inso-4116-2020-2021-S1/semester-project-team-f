from api.util.config import db
from api.dao.users import Users
from api.dao.patients import Patients
from api.dao.addresses import Addresses

#run this to create the tables on pgadmin

db.drop_all()
db.create_all()