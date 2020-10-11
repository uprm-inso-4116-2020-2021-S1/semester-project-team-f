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
    def getCurrentPositiveCases():
        try:
            positive_records = CovidCases.getCurrentPositiveCases()
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
    def getNegativeCases():             #includes the patients who have never being infected and those that recovered
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
            recovered_records = CovidCases.getRecoveredCases()
            result_list = []
            for record in recovered_records:
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
        valid_parameters = Utilities.verify_parameters(json, CovidCases.REQUIRED_PARAMETERS)
        if valid_parameters:   
            try:
                recent_case = CovidCases.getMostRecentCaseByPatient(valid_parameters['patient_id'])
                if recent_case == None or not recent_case.has_covid:
                    case = CovidCases(**valid_parameters).create()
                    result = {
                        "message": "Success!",
                        "case": Utilities.to_dict(case)
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(reason="Patient already has an active case."), 400        

            except Exception as e:
                return jsonify(reason="Server error", error=e.__str__()), 500
        else:
            return jsonify(reason="Invalid parameters"), 400

    @staticmethod
    def deleteRecord(json):
        deleted_record = CovidCases.deleteRecord(json)
        result = {
            "message": "Success!",
            "request": Utilities.to_dict(deleted_record)
        }
        return jsonify(result), 200