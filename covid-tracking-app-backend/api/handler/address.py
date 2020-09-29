from flask import jsonify, session
from api.dao.address import Address
from api.util.utilities import Utilities

class AddressHandler:

    @staticmethod
    def getAllAddresses():
        try:
            addresses = Address.getAllAddresses()
            result_list = []
            for address in addresses:
                result_list.append(Utilities.to_dict(address))
            result = {
                "message": "Success!",
                "addresses": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getAddressById(aid):
        try:
            address = Address.getAddressById(aid)
            address_dict = Utilities.to_dict(address)
            result = {
                "message": "Success!",
                "address": address_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getAddressesByCountry(cname):
        try:
            addresses = Address.getAddressesByCountry(cname)
            result_list = []
            for address in addresses:
                result_list.append(Utilities.to_dict(address))
            result = {
                "message": "Success!",
                "addresses": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getAddressesByRegion(rname):
        try:
            addresses = Address.getAddressesByRegion(rname)
            result_list = []
            for address in addresses:
                result_list.append(Utilities.to_dict(address))
            result = {
                "message": "Success!",
                "addresses": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getStreetAddresses(saddress):
        try:
            addresses = Address.getStreetAddresses(saddress)
            result_list = []
            for address in addresses:
                result_list.append(Utilities.to_dict(address))
            result = {
                "message": "Success!",
                "addresses": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createAddress(json):
        valid_params = Utilities.verify_parameters(json, Address.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                address = Address.getSpecificAddress(json)
                result = { }
                if address:
                    address_dict = Utilities.to_dict(address)
                    result = {
                        "message": "Success!",
                        "address": address_dict,
                    }
                else:
                    new_address = Address(**valid_params).create()
                    address_dict = Utilities.to_dict(new_address)
                    result = {
                        "message": "Success!",
                        "address": address_dict,
                    }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40