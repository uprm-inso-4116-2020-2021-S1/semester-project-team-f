from flask import jsonify, session
from api.util.config import app, mail
from flask_mail import Message
from api.dao.covid_cases import CovidCases
from api.dao.patient import Patient
from api.dao.medical_office import MedicalOffice
from api.dao.user import User
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
                
                if case.test_status == 3:
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
                    if patient_case.test_status != 3 and prev_case and prev_case.test_status == 3:
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
    def getCovidTestsByofficeId(oid):
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
    def createRecord(json):
        valid_params = Utilities.verify_parameters(json, CovidCases.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                patient_exists = Patient.getPatientByOfficeAndUserId(json['office_id'], json['patient_id'])
                if patient_exists:
                    try:
                        covid_case = CovidCases(**valid_params).create()
                        case_dict = Utilities.to_dict(covid_case)
                        result = {
                            "message": "Success!",
                            "case": case_dict,
                        }
                        return jsonify(result), 201
                    except:
                        return jsonify(reason="Patient was already tested today."), 401
                else:
                    return jsonify(reason="User is not in our office record."), 401
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40

    @staticmethod
    def deleteRecord(key):
        try:
            parameters = key.split('&')
            deleted_record = CovidCases.deleteRecord({'patient_id': parameters[0], 'office_id': parameters[1], 'date_tested': parameters[2]})
            result = {
                "message": "Success!",
                "case": Utilities.to_dict(deleted_record)
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def updateRecord(json):
        valid_parameters = Utilities.verify_parameters(json, CovidCases.REQUIRED_PARAMETERS)
        if valid_parameters:
            try:
                updatedInfo = CovidCases.updateCovidStatus(json)
                result = {
                    "message": "Success!",
                    "case": Utilities.to_dict(updatedInfo)
                }

                user = Utilities.to_dict(User.getUserById(json['patient_id']))
                office = Utilities.to_dict(MedicalOffice.getMedicalOfficeById(json['office_id']))

                if(json['test_status'] != 1):
                    statuses = {2: 'negative', 3: 'positive'}

                    msg = Message('COVID-19 Test Result',
                                    sender='thecovidtracker@gmail.com',
                                    recipients=[user['email']])
                    msg.body = f'''Hi {user['full_name']},
                    
                    Your tested {statuses[json['test_status']]} to the COVID-19. If you want to know more info about your COVID-19 test, please call {office['office_phone_number']}.
                    '''
                    mail.send(msg)

                return jsonify(result), 200
            except Exception as e:
                return jsonify(reason="Server error", error=e.__str__()), 500