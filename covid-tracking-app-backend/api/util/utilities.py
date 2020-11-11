class Utilities:

    @staticmethod
    def to_dict(obj):
        # result = dict()
        # for prop, value in vars(obj).items():
        #     result[prop] = str(value)
        # return result
        res = {column.key: getattr(obj, attr)
               for attr, column in obj.__mapper__.c.items()}
        return res

    @staticmethod
    def verify_parameters(jsonP, params):
        for param, value in jsonP.items():
            if param in params and value is None:
                return None
        return jsonP
