from flask import jsonify, session
from api.dao.patients import Patients
from api.util.utilities import Utilities

class PatientsHandler:

    @staticmethod
    def getAllPatients():
        try:
            patients = Patients.getAllPatients()
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
            patient = Patients.getPatientsById(pid)
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
            patients = Patients.getPatientsByDoctor(did)
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
            patients = Patients.getPositiveCases()
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
            patients = Patients.getNegativeCases()
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
            patients = Patients.getNeverInfectedPatients()
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
            patients = Patients.getRecoveredPatients()
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
