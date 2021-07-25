from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)
from models.user import User
from models.task import Task
from schemas.task_schema import TaskSchema

task = Blueprint('task', __name__)
ROUTE_PREFIX = "/task"

task_schema = TaskSchema()


@task.route(f'{ROUTE_PREFIX}/find_by_user', methods=['GET'])
@jwt_required()
def find_by_user():
  user_id = get_jwt_identity()
  user = User.find_by_id(user_id)

  tasks = task_schema.dump(
      user.tasks, many=True)
  return jsonify(tasks=tasks), 200
