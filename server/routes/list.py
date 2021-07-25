from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)
from models.user import User
from models.list import List
from schemas.list_schema import ListSchema

list = Blueprint('list', __name__)
ROUTE_PREFIX = "/list"

list_schema = ListSchema()


@list.route(f'{ROUTE_PREFIX}/find_by_user', methods=['GET'])
@jwt_required()
def find_by_user():
  user_id = get_jwt_identity()
  user = User.find_by_id(user_id)

  lists = list_schema.dump(
      user.lists, many=True)
  return jsonify(lists=lists), 200
