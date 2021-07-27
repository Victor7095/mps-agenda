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
      user.hosted_meetings, many=True)

  meetings_2 = meeting_schema.dump(
      user.meetings, many=True)

  meetings = meetings.append(meetings_2)
  return jsonify(meetings=meetings), 200


@meeting.route(f'{ROUTE_PREFIX}', methods=['POST'])
@jwt_required()
def new_meeting():
  try:
    request_data = request.get_json()

    user_id = get_jwt_identity()
    user = User.find_by_id(user_id)

    meeting_data = request_data["meeting"]
    meeting = meeting_schema.load(meeting_data)  # type: Meeting

    user.hosted_meetings.append(meeting)
    for invited_user in meeting_data["users"]:
      u = User.find_by_id(invited_user['id'])
      meeting.guests.append(u)

    res = Meeting.create(meeting)
    if not res:
      return jsonify(message="Meeting not created"), 400

    meeting = meeting_schema.dump(meeting)
    return jsonify(meeting=meeting), 200
  except Exception as e:
    print(e)
    return jsonify(message="Meeting not created"), 400
