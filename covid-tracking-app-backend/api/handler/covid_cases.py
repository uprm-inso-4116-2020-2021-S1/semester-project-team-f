from flask import jsonify, session
from api.dao.covid_cases import CovidCases
from api.util.utilities import Utilities

class CovidCasesHandler:

    @staticmethod
    def getAllCases():
        try:
            records = CovidCases.getAllCases()
            result_list = []
            for record in records:
                result_list.append(Utilities.to_dict(record))
            result = {
                "message": "Success!",
                "cases": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getCumulativePositiveCases():
        try:
            positive_records = CovidCases.getCumulativePositiveCases()
            result_list = []
            for record in positive_records:
                result_list.append(Utilities.to_dict(record))
            result = {
                "message": "Success!",
                "cases": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getActiveCases():
        try:
            patients = Patient.getAllPatients()
            active_cases = []
            for patient in patients:
                case = CovidCases.getMostRecentCaseByPatient(patient.user_id)
                
                if case.tested_positive:
                    active_cases.append(Utilities.to_dict(case))

            result = {
                "message": "Success!",
                "cases": active_cases
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getNegativeTests():             #includes the patients who have never being infected and those that recovered
        try:
            negative_records = CovidCases.getNegativeCases()
            result_list = []
            for record in negative_records:
                result_list.append(Utilities.to_dict(record))
            result = {
                "message": "Success!",
                "cases": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getRecoveredCases():
        try:
            patients = Patient.getAllPatients()
            recovered_cases = []
            for patient in patients:
                cases = CovidCases.getCasesByPatient(patient.user_id)
                prev_case = None
                for patient_case in cases:
                    if not patient_case.tested_positive and prev_case and prev_case.tested_positive:
                        recovered_cases.append(Utilities.to_dict(patient_case))
                    prev_case = patient_case

            result = {
                "message": "Success!",
                "cases": recovered_cases
            }
            return jsonify(result), 200
            except Exception as e:
                return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getCovidTestsByDoctor(did):
        try:
            records = CovidCases.getCasesByDoctor(did)
            result_list = []
            for record in records:
                result_list.append(Utilities.to_dict(record))
            result = {
                "message": "Success!",
                "cases": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getCovidTestsByoffice(oid):
        try:
            records = CovidCases.getCasesByOffice(oid)
            result_list = []
            for record in records:
                result_list.append(Utilities.to_dict(record))
            result = {
                "message": "Success!",
                "cases": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getCasesByDoctorAndOffice(json):
        try:
            records = CovidCases.getCasesByDoctorAndOffice(json)
            result_list = []
            for record in records:
                result_list.append(Utilities.to_dict(record))
            result = {
                "message": "Success!",
                "cases": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def addRecord(json):
        valid_params = Utilities.verify_parameters(json, CovidCases.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                covid_case = CovidCases(**valid_params).create()
                case_dict = Utilities.to_dict(covid_case)
                result = {
                    "message": "Success!",
                    "case": case_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40

    @staticmethod
    def deleteRecord(json):
        deleted_record = CovidCases.deleteRecord(json)
        result = {
            "message": "Success!",
            "request": Utilities.to_dict(deleted_record)
        }
        return jsonify(result), 200