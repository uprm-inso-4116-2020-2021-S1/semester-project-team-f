from flask import jsonify, session
from api.dao.medical_office import MedicalOffice
from api.util.utilities import Utilities

class MedicalOfficeHandler:

    @staticmethod
    def getAllMedicalOffices():
        try:
            medical_offices = MedicalOffice.getAllMedicalOffices()
            result_list = []
            
            for office in medical_offices:
                result_list.append(Utilities.to_dict(office))

            result = {
                "message": "Success!",
                "medical_offices": result_list
            }

            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getMedicalOfficesByOwnerId(oid):
        try:
            medical_offices = MedicalOffice.getMedicalOfficesbyOwnerId(oid)
            result_list = []
            
            for office in medical_offices:
                result_list.append(Utilities.to_dict(office))

            result = {
                "message": "Success!",
                "medical_offices": result_list
            }

            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getMedicalOfficeById(mid):
        try:
            medical_office = MedicalOffice.getMedicalOfficeById(mid)
            medical_dict = Utilities.to_dict(medical_office)

            result = {
                "message": "Success!",
                "medical_office": medical_dict
            }

            return jsonify(result), 200

        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getMedicalOfficeByAddressId(aid):
        try:
            medical_office = MedicalOffice.getMedicalOfficeByAddressId(aid)
            medical_dict = Utilities.to_dict(medical_office)

            result = {
                "message": "Success!",
                "medical_office": medical_dict
            }

            return jsonify(result), 200

        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500