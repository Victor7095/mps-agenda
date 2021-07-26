from flask import jsonify, Blueprint
from flask_jwt_extended import (
    create_access_token, get_jwt,
    get_jwt_identity, jwt_required
)

refresh = Blueprint('refresh', __name__)


# The jwt_required decorator insures a valid refresh
# token is present in the request before calling this endpoint. We
# can use the get_jwt_identity() function to get the identity of
# the refresh token, and use the create_access_token() function again
# to make a new access token for this identity.
@refresh.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
  user_id = get_jwt_identity()
  user_data = get_jwt()

  identity = {"id": user_id,
              "username": user_data["username"],
              "name": user_data["name"]}

  access_token = create_access_token(identity=identity)
  ret = {
      'access_token': access_token
  }
  return jsonify(ret), 200
