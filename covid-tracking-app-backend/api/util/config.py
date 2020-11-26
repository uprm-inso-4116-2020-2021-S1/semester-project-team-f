import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

db_url = 'localhost:5432'
db_name = 'covid_tracking_app_db'
db_user = 'team-f'
db_password = 'pay-respect'

DEV_DB = f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}'
PROD_DB = 'postgres://ntqtqkcotdjvpk:458fda834c0d3dafee5ad4183a17d9b760f2c64f9f9b04a6b13705c57a13c67f@ec2-54-147-126-202.compute-1.amazonaws.com:5432/d1q4e8lrv6el9l'

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = PROD_DB
app.secret_key = "coronavirus"
app.config['SECRET_KEY'] = "coronavirus"
db = SQLAlchemy(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'thecovidtracker@gmail.com'
app.config['MAIL_PASSWORD'] = 'team-f2020'
mail = Mail(app)

CORS(app)