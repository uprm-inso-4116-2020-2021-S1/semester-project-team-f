from flask import request, url_for, redirect
from api.util.config import app, mail
from api.handler.address import AddressHandler
from api.handler.user import UserHandler
from api.handler.patient import PatientHandler
from api.handler.doctor import DoctorHandler
from api.handler.covid_cases import CovidCasesHandler
from api.handler.medical_office import MedicalOfficeHandler
from api.handler.location import LocationHandler
from api.handler.visited_location import VisitedLocationHandler
from api.dao.user import User
from flask_mail import Message

@app.route('/', methods=['GET'])
def home():
    return "Welcome!"

@app.route("/locations", methods=['GET', 'POST'])
def getAllLocationsOrCreate():
    if request.method == 'GET':
        return LocationHandler.getAllLocations()
    elif request.method == 'POST':
        return LocationHandler.createLocation(request.json)

@app.route('/locations/<int:lid>', methods=['GET'])
def getLocationById(lid):
    if request.method == 'GET':
        return LocationHandler.getLocationById(lid)

@app.route("/visited-locations", methods =['GET', 'POST'])
def getAllVisitedLocationsOrCreate():
    if request.method == 'GET':
        return VisitedLocationHandler.getAllVisitedLocations()
    elif request.method =='POST':
        return VisitedLocationHandler.createVisitedLocation(request.json)

@app.route("/address", methods=['GET', 'POST'])
def getAllAddressesOrCreate():
    if request.method == 'GET':
        return AddressHandler.getAllAddresses()
    elif request.method == 'POST':
        return AddressHandler.createAddress(request.json)

@app.route('/address/<int:aid>', methods=['GET'])
def getAddressById(aid):
    return AddressHandler.getAddressById(aid)

@app.route('/offices', methods=['GET'])
def getMedicalOffices():
    if request.method == 'GET':
        return MedicalOfficeHandler.getAllMedicalOffices()

@app.route('/offices/<int:mid>', methods=['GET'])
def getMedicalOfficeById(mid):
    return MedicalOfficeHandler.getMedicalOfficeById(mid)

@app.route('/users/<string:uid>/offices', methods=['GET'])
def getMedicalOfficesByOwnerId(uid):
    return MedicalOfficeHandler.getMedicalOfficesByOwnerId(uid)

@app.route("/users", methods=['GET', 'POST', 'PUT'])
def getAllUsersOrCreateOrUpdate():
    if request.method == 'GET':
        return UserHandler.getAllUsers()
    elif request.method == 'POST':
        return UserHandler.createUser(request.json)
    elif request.method == 'PUT':
        return UserHandler.updateUserInfo(request.json)

@app.route('/users/<string:uid>', methods=['GET'])
def getUserByIdOrEmail(uid):
    if request.method == 'GET':
        if '@' in uid:
            return UserHandler.getUserByEmail(uid)
        else:
            return UserHandler.getUserById(uid)

@app.route('/patients/<string:uid>', methods=['GET'])
def getPatientByUserId(uid):
    if request.method == 'GET':
        return PatientHandler.getPatientByUserId(uid)

@app.route('/patients/<string:id>/covid-cases', methods=['GET'])
def getCovidCasesByPatientId(id):
    if request.method == 'GET':
        return CovidCasesHandler.getCovidTestsByPatientId(id)

@app.route('/doctors', methods=['GET', 'POST'])
def getAllDoctorsOrCreate():
    if request.method == 'GET':
        return DoctorHandler.getAllDoctors()
    elif request.method == 'POST':
        return DoctorHandler.createDoctor(request.json)

@app.route('/doctors/<string:did>', methods=['GET'])
def getDoctorByUserId(did):
    return DoctorHandler.getDoctorByUserId(did)

@app.route('/offices/<int:oid>/doctors/<string:uid>', methods=['DELETE'])
def deleteDoctorByOfficeAndUserId(oid, uid):
    if request.method == 'DELETE':
        return DoctorHandler.deleteDoctor(oid, uid)

@app.route('/patients', methods=['GET', 'POST'])
def getAllPatientsOrCreate():
    if request.method == 'GET':
        return PatientHandler.getAllPatients()
    elif request.method == 'POST':
        return PatientHandler.createPatient(request.json)

@app.route('/offices/<int:id>/patients', methods=['GET'])
def getPatientsByOfficeId(id):
    if request.method == 'GET':
        return PatientHandler.getPatientsByOfficeId(id)

@app.route('/offices/<int:id>/doctors', methods=['GET'])
def getDoctorsByOfficeId(id):
    if request.method == 'GET':
        return DoctorHandler.getDoctorsByOfficeId(id)

@app.route('/offices/<int:id>/covid-cases', methods=['GET'])
def getCovidCasesByOfficeId(id):
    if request.method == 'GET':
        return CovidCasesHandler.getCovidTestsByofficeId(id)

@app.route('/offices/<int:oid>/patients/<string:uid>', methods=['GET', 'DELETE'])
def getOrDeletePatientOfficeAndUserId(oid, uid):
    if request.method == 'GET':
        return PatientHandler.getPatientByOfficeAndUserId(oid, uid)
    elif request.method == 'DELETE':
        return PatientHandler.deletePatient(oid, uid)

@app.route('/covid-cases', methods=['GET', 'POST', 'PUT'])
def getAllCovidCasesOrCreateOrUpdate():
    if request.method == 'GET':
        return CovidCasesHandler.getAllCases()
    elif request.method == 'POST':
        return CovidCasesHandler.createRecord(request.json)
    elif request.method == 'PUT':
        return CovidCasesHandler.updateRecord(request.json)

@app.route('/covid-cases/<string:id>', methods=['DELETE'])
def deleteCovidCase(id):
    if request.method == 'DELETE':
        return CovidCasesHandler.deleteRecord(id)

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

@app.route('/account-activation', methods=['GET', 'POST'])
def activation_request():
    json = request.json
    user =   User.getUserByEmail(json['email'])
    send_activation_email(user)
    return UserHandler.sentEmail()

@app.route('/account-activation/<token>', methods=['GET', 'POST'])
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