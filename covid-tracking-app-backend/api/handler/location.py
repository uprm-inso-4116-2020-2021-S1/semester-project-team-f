from flask import jsonify, session
from api.dao.location import Location
from api.util.utilities import Utilities

class LocationHandler:

    @staticmethod
    def getAllLocations():
        try:
            locations = Location.getAllLocations()
            result_list = []
            for location in locations:
                result_list.append(Utilities.to_dict(location))
            result = {
                "message": "Success!",
                "locations": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getLocationById(lid):
        try:
            location = Location.getLocationById(lid)
            location_dict = Utilities.to_dict(location)
            result = {
                "message": "Success!",
                "location": location_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getLocationByLattitudeAndLongitude(json):
        try:
            location = Location.getLocationByLattitudeAndLongitude(json)
            location_dic = Utilities.to_dict(location)

            result = {
                "message": "Success!",
                "location": location_dic
            }
            return jsonify(result), 200

        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getLocationsRelativeToAddress(aid):
        try:
            location = Location.getLocationsRelativeToAddress(aid)
            location_dict = Utilities.to_dict(location)
            result = {
                "message": "Success!",
                "location": location_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createLocation(json):
        valid_params = Utilities.verify_parameters(json, Location.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                location = Location.getLocationByLattitudeAndLongitude(json)
                
                if location is None:  
                    location = Location(**valid_params).create()

                location_dict = Utilities.to_dict(location)
                result = {
                    "message": "Success!",
                    "location": location_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40