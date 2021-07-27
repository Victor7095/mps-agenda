from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)
from models.user import User
from schemas.user_schema import UserSchema

user = Blueprint('user', __name__)
ROUTE_PREFIX = "/user"

user_schema = UserSchema()


@user.route(f'{ROUTE_PREFIX}/search', methods=['GET'])
@jwt_required()
def search():
  name = request.args.get('name')

  user_id = get_jwt_identity()

  users = User.search(user_id, name)
  users = user_schema.dump(
      users, many=True)
  return jsonify(users=users), 200
