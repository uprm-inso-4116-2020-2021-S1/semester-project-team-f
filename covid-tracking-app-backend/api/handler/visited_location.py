from flask import jsonify, session
from api.dao.visited_location import VisitedLocation
from api.util.utilities import Utilities

class VisitedLocationHandler:

    @staticmethod
    def getAllVisitedLocations():
        try:
            locations = VisitedLocation.getAllVisitedLocations()
            result_list = []
            for VisitedLocation in locations:
                result_list.append(Utilities.to_dict(VisitedLocation))
            result = {
                "message": "Success!",
                "Visited locations": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getVisitedLocationByLattitudeAndLongitude(json):
        try:
            location = VisitedLocation.getVisitedLocationByLattitudeAndLongitude(json)
            location_dic = Utilities.to_dict(location)

            result = {
                "message": "Success!",
                "visited location": location_dic
            }
            return jsonify(result), 200

        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createVisitedLocation(json):
        valid_params = Utilities.verify_parameters(json, VisitedLocation.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                location = VisitedLocation(**valid_params).create()
                location_dict = Utilities.to_dict(covid_case)
                result = {
                    "message": "Success!",
                    "visited location": location_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40
    
    @staticmethod
    def deleteVisitedLocation(json):
        deleteVisitedLocation = VisitedLocation.deleteVisitedLocation(json)
        result = {
            "message": "Success!",
            "Visited Location": Utilities.to_dict(deleteVisitedLocation)
        }
        return jsonify(result), 200