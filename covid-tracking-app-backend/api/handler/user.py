from flask import jsonify, session
from api.dao.user import User
from api.util.utilities import Utilities

class UserHandler:

    @staticmethod
    def getAllUsers():
        try:
            users = User.getAllUsers()
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
            user = User.getUserById(uid)
            user_dict = Utilities.to_dict(user)
            result = {
                "message": "Success!",
                "user": user_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def login(json):
        try:
            if json['email'] == "" or json['password'] == "":
                return jsonify(reason="Must fill both email and password fields."), 400
            user = User.getUserByEmail(json['email'])
            user_dic = Utilities.to_dict(user)
            if user and user.password == json['password']:
                session['logged_in'] = True
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
        valid_params = Utilities.verify_parameters(json, User.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                email_exists = User.getUserByEmail(json['email'])
                if email_exists:
                    return jsonify(message="Email already taken. Please use another one."), 400
                created_user = User(**valid_params).create()
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