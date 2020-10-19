import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db_url = 'localhost:5432'
db_name = 'covid_tracking_app_db'
db_user = 'team-f'
db_password = 'pay-respect'

DEV_DB = f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}'

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DEV_DB
app.secret_key = "coronavirus"

db = SQLAlchemy(app)
CORS(app)