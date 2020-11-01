from flask import request, url_for, redirect
from api.util.config import app, mail
from api.handler.address import AddressHandler
from api.handler.user import UserHandler
from api.handler.patient import PatientHandler
from api.handler.doctor import DoctorHandler
from api.handler.medical_office import MedicalOfficeHandler
from api.handler.location import LocationHandler
from api.dao.user import User
from flask_mail import Message

@app.route('/', methods=['GET'])
def home():
    return "Welcome!"

@app.route("/location", methods=['GET', 'POST'])
def getAllLocationOrCreate():
    if request.method == 'GET':
        return LocationHandler.getAllLocations()
    elif request.method == 'POST':
        return LocationHandler.createLocation(request.json)

@app.route('/location/<int:lid>', methods=['GET'])
def getLocationById(lid):
    return LocationHandler.getLocationById(lid)

@app.route("/address", methods=['GET', 'POST'])
def getAllAddressOrCreate():
    if request.method == 'GET':
        return AddressHandler.getAllAddresses()
    elif request.method == 'POST':
        return AddressHandler.createAddress(request.json)

@app.route('/address/<int:aid>', methods=['GET'])
def getAddressById(aid):
    return AddressHandler.getAddressById(aid)

@app.route('/offices', methods=['GET'])
def getMedicalOffices():
    return MedicalOfficeHandler.getAllMedicalOffices()

@app.route('/offices/<int:mid>', methods=['GET'])
def getMedicalOfficeById(mid):
    return MedicalOfficeHandler.getMedicalOfficeById(mid)

@app.route("/users", methods=['GET', 'POST'])
def getAllUsersOrCreate():
    if request.method == 'GET':
        return UserHandler.getAllUsers()
    elif request.method == 'POST':
        return UserHandler.createUser(request.json)

@app.route('/users/<string:uid>', methods=['GET', 'PUT'])
def getUserByIdOrUpdate(uid):
    if request.method == 'GET':
        return UserHandler.getUserById(uid)
    elif request.method == 'PUT':
        return UserHandler.updateUserInfo(uid, request.json)

@app.route('/doctors', methods=['GET', 'POST'])
def getAllDoctorsOrCreate():
    if request.method == 'GET':
        return DoctorHandler.getAllDoctors()
    elif request.method == 'POST':
        return DoctorHandler.createDoctor(request.json)

@app.route('/doctors/<string:did>', methods=['GET'])
def getDoctorById(did):
    return DoctorHandler.getDoctorById(did)

@app.route('/patients', methods=['GET'])
def getAllPatientsOrCreate():
    if request.method == 'GET':
        return PatientHandler.getAllPatients()
    elif request.method == 'POST':
        return PatientHandler.createPatient(request.json)

@app.route('/patients/<int:pid>', methods=['GET'])
def getPatientById(pid):
    return PatientHandler.getPatientById(pid)


def send_activation_email(user):
    token = user.get_activation_token()
    msg = Message('Email Confirmation Code',
                    sender='thecovidtracker@gmail.com',
                    recipients=[user.email])
    msg.body = f'''To activate your account visit the following link:
{url_for('activation_token', token=token, _external=True)}

If you did not make this account then simply ignore this email.
'''
    mail.send(msg)

@app.route('/login', methods=['POST'])
def login():
    return UserHandler.login(request.json)

@app.route('/logout', methods=['GET'])
def logout():
    return UserHandler.logout()

@app.route('/account_activation', methods=['GET', 'POST'])
def activation_request():
    json = request.json
    user =   User.getUserByEmail(json['email'])
    send_activation_email(user)
    return UserHandler.sentEmail()

@app.route('/account_activation/<token>', methods=['GET', 'POST'])
def activation_token(token):
    #You should check if user is logged in MAYBE
    user = User.getUserByEmail(User.verify_activation_token(token))
    if user is None:
        pass
        #You should print a message saying token is not valid or expired
    UserHandler.activateAccount(user)
    return redirect('http://localhost:4200')
    #return UserHandler.activateAccount(user)

if __name__ == '__main__':
    app.run()