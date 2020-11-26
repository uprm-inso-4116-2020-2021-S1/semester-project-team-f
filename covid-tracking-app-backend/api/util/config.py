import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

db_url = 'localhost:5432'
db_name = 'covid_tracking_app_db'
db_user = 'team-f'
db_password = 'pay-respect'

DEV_DB = f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}'
PROD_DB = 'postgres://ihfzbzayjmxvfz:a827b1d632abeaddef58603ff26a672a028f5617d4470a332459f55a829fa716@ec2-54-157-88-70.compute-1.amazonaws.com:5432/dahctghrejcqb5'

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = PROD_DB
app.secret_key = "coronavirus"
app.config['SECRET_KEY'] = "coronavirus"
db = SQLAlchemy(app)

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'thecovidtracker@gmail.com'
app.config['MAIL_PASSWORD'] = 'team-f2020'
mail = Mail(app)

CORS(app)