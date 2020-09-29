from flask import jsonify, session
from api.dao.user import User
from api.dao.patient import Patient
from api.dao.doctor import Doctor
from api.util.utilities import Utilities

class PatientHandler:

    @staticmethod
    def getAllPatients():
        try:
            patients = Patient.getAllPatients()
            result_list = []
            for patient in patients:
                result_list.append(Utilities.to_dict(patient))
            result = {
                "message": "Success!",
                "users": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getPatientById(pid):
        try:
            patient = Patient.getPatientsById(pid)
            patient_dict = Utilities.to_dict(patient)
            result = {
                "message": "Success!",
                "patient": patient_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getPatientsByDoctor(did):
        try:
            patients = Patient.getPatientsByDoctorId(did)
            result_list = []
            for patient in patients:
                result_list.append(Utilities.to_dict(patient))
            result = {
                "message": "Success!",
                "patients": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getPositiveCases():
        try:
            patients = Patient.getPositiveCases()
            result_list = []
            for patient in patients:
                result_list.append(Utilities.to_dict(patient))
            result = {
                "message": "Success!",
                "patients": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getNegativeCases():             #includes the patients who have never being infected and those that recovered
        try:
            patients = Patient.getNegativeCases()
            result_list = []
            for patient in patients:
                result_list.append(Utilities.to_dict(patient))
            result = {
                "message": "Success!",
                "patients": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getNeverInfectedPatients():
        try:
            patients = Patient.getNeverInfectedPatients()
            result_list = []
            for patient in patients:
                result_list.append(Utilities.to_dict(patient))
            result = {
                "message": "Success!",
                "patients": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getRecoveredPatients():
        try:
            patients = Patient.getRecoveredPatients()
            result_list = []
            for patient in patients:
                result_list.append(Utilities.to_dict(patient))
            result = {
                "message": "Success!",
                "patients": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createPatient(json):
        valid_params = Utilities.verify_parameters(json, Patient.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                user_exists = User.getUserById(json['patient_user_id'])
                doctor_exists = Doctor.getDoctorById(json['doctor_id'])
                if not user_exists:
                    return jsonify(message="The patient you are trying to register doesn't have an account."), 400
                if not doctor_exists:
                    return jsonify(message="The doctor you are trying to register doesn't have an account."), 400
                created_patient = Patient(**valid_params).create()
                patient_dict = Utilities.to_dict(created_patient)
                result = {
                    "message": "Success!",
                    "patient": patient_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40
