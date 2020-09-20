from flask import request
from api.util.config import app
from api.handler.users import UsersHandler
from api.handler.patients import PatientsHandler

@app.route('/', methods=['GET'])
def home():
    return "Welcome!"

@app.route("/users", methods=['GET', 'POST'])
def getAllUsersOrCreate():
    if request.method == 'GET':
        return UsersHandler.getAllUsers()
    else request.method == 'POST':
        return UsersHandler.createUser(request.json)


@app.route('/users/<int:uid>', methods=['GET'])
def getUserById(uid):
    return UsersHandler.getUserById(uid)


@app.route('/doctors', methods=['GET'])
def getAllDoctors():
    return UsersHandler.getDoctors()


@app.route('/patients', methods=['GET'])
def getAllPatients():
    return PatientsHandler.getAllPatients()


@app.route('/login', methods=['POST'])
def login():
    return UsersHandler.login(request.json)


@app.route('/logout', methods=['GET'])
def logout():
    return UsersHandler.logout()


if __name__ == '__main__':
    app.run()
