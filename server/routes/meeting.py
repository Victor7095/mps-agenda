from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)
from models.user import User
from models.meeting import Meeting
from schemas.meeting_schema import MeetingSchema

meeting = Blueprint('meeting', __name__)
ROUTE_PREFIX = "/meeting"

meeting_schema = MeetingSchema()


@meeting.route(f'{ROUTE_PREFIX}/find_by_user', methods=['GET'])
@jwt_required()
def find_by_user():
  user_id = get_jwt_identity()
  user = User.find_by_id(user_id)

  meetings = meeting_schema.dump(
      user.meetings, many=True)
  return jsonify(meetings=meetings), 200
