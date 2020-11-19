from flask import jsonify, session
from api.dao.user import User
from api.dao.patient import Patient
from api.dao.doctor import Doctor
from api.dao.covid_cases import CovidCases
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
    def getPatientByUserId(pid):
        try:
            patients = Patient.getPatientByUserId(pid)
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
    def getPatientByOfficeAndUserId(oid, uid):
        try:
            patient = Patient.getPatientByOfficeAndUserId(oid, uid)
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
                "patient": patient_dict
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
    def deletePatient(oid, uid):
        covid_case_exists = CovidCases.getCasesByPatientId(uid)
        if covid_case_exists:
            return jsonify(reason="Can't delete the patient, the patient has active tests."), 400
        deletedPatient = Patient.deletePatient(oid, uid)
        result = {
            "message": "Success!",
            "patient": Utilities.to_dict(deletedPatient)
        }
        return jsonify(result), 200
