from flask import jsonify, session
from api.dao.user import User
from api.dao.doctor import Doctor
from api.util.utilities import Utilities

class DoctorHandler:

    @staticmethod
    def getAllDoctors():
        try:
            doctors = Doctor.getAllDoctors()
            result_list = []
            for doctor in doctors:
                result_list.append(Utilities.to_dict(doctor))
            result = {
                "message": "Success!",
                "doctors": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getDoctorById(did):
        try:
            doctor = Doctor.getDoctorById(did)
            doctor_dict = Utilities.to_dict(doctor)
            result = {
                "message": "Success!",
                "doctor": doctor_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createDoctor(json):
        valid_params = Utilities.verify_parameters(json, Doctor.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                user_exists = User.getUserById(json['user_id'])
                if not user_exists:
                    return jsonify(message="The doctor you are trying to register doesn't have an account."), 400
                created_doctor = Doctor(**valid_params).create()
                doctor_dict = Utilities.to_dict(created_doctor)
                result = {
                    "message": "Success!",
                    "doctor": doctor_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40
