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
                "patients": result_list
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
    def getPatientByIdAndOffice(key):
        try:
            parameters = key.split('&')
            patient = Patient.getPatientByIdAndOffice({'user_id': parameters[1], 'office_id': parameters[0]})
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
    def getPatientsByOfficeId(oid):
        try:
            patients = Patient.getPatientsByOfficeId(oid)
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

    @staticmethod
    def deletePatient(key):
        parameters = key.split('&')
        deletedPatient = Patient.deletePatient({'user_id': parameters[1], 'office_id': parameters[0]})
        result = {
            "message": "Success!",
            "patient": Utilities.to_dict(deletedPatient)
        }
        return jsonify(result), 200
