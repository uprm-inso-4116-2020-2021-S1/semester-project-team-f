from flask import jsonify, session
from api.dao.visited_location import VisitedLocation
from api.util.utilities import Utilities

class VisitedLocationHandler:

    @staticmethod
    def getAllVisitedLocations():
        try:
            visited_locations = VisitedLocation.getAllVisitedLocations()
            result_list = []
            for location in visited_locations:
                result_list.append(Utilities.to_dict(location))
            result = {
                "message": "Success!",
                "visited_locations": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getLocationsVisitedByUserId(uid):
        try:
            visited_locations = VisitedLocation.getLocationsVisitedByUserId(uid)
            result_list = []
            for location in visited_locations:
                result_list.append(Utilities.to_dict(location))

            result = {
                "message": "Success!",
                "visited_locations": result_list
            }
            return jsonify(result), 200

        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getVisitedLocationsRelativeToAddress(aid):
        try:
            visited_locations = VisitedLocation.getVisitedLocationsRelativeToAddress(aid)
            result_list = []
            for location in visited_locations:
                result_list.append(Utilities.to_dict(location))

            result = {
                "message": "Success!",
                "visited_locations": result_list
            }
            return jsonify(result), 200

        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createVisitedLocation(json):
        valid_params = Utilities.verify_parameters(json, VisitedLocation.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                visited_location = VisitedLocation(**valid_params).create()
                location_dict = Utilities.to_dict(visited_location)
                result = {
                    "message": "Success!",
                    "visited_location": location_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40
    
    @staticmethod
    def deleteVisitedLocation(json):
        deletedVisitedLocation = VisitedLocation.deleteVisitedLocation(json)
        result = {
            "message": "Success!",
            "visited_location": Utilities.to_dict(deletedVisitedLocation)
        }
        return jsonify(result), 200