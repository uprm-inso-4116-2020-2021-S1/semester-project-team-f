from flask import jsonify, session
from api.dao.users import Users
from api.util.utilities import Utilities

class UsersHandler:

    @staticmethod
    def getAllUsers():
        try:
            users = Users.getAllUsers()
            result_list = []
            for user in users:
                result_list.append(Utilities.to_dict(user))
            result = {
                "message": "Success!",
                "users": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getUserById(uid):
        try:
            user = Users.getUserById(uid)
            user_dict = Utilities.to_dict(user)
            result = {
                "message": "Success!",
                "user": user_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getDoctors():
        try:
            users = Users.getDoctors()
            result_list = []
            for user in users:
                result_list.append(Utilities.to_dict(user))
            result = {
                "message": "Success!",
                "users": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getNonDoctors():
        try:
            users = Users.getNonDoctors()
            result_list = []
            for user in users:
                result_list.append(Utilities.to_dict(user))
            result = {
                "message": "Success!",
                "users": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def login(json):
        try:
            if json['email'] == "" or json['password'] == "":
                return jsonify(reason="Must fill both email and password fields."), 400
            user = Users.getUserByEmail(json['email'])
            user_dic = Utilities.to_dict(user)
            if user and user.password == json['password']:
                session['logged_in'] = True
                status = True
                result = {
                    "message": "Success!",
                    "user": user_dic
                }
                return jsonify(result), 200
            else:
                return jsonify(reason="Incorrect email or password."), 401
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def logout():
        try:
            session['logged_in'] = False
            return jsonify(status='Success!'), 200
        except Exception as err:
            return jsonify(reason="Server error!", error=err.__str__()), 500

    @staticmethod
    def createUser(json):
        valid_params = Utilities.verify_parameters(json, Users.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                email_exists = Users.getUserByEmail(json['email'])
                if email_exists:
                    return jsonify(message="Email already taken. Please use another one."), 400
                created_user = Users(**valid_params).createUser()
                user_dict = Utilities.to_dict(created_user)
                result = {
                    "message": "Success!",
                    "user": user_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40