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


@task.route(f'{ROUTE_PREFIX}', methods=['POST'])
@jwt_required()
def new_task():
  request_data = request.get_json()

  user_id = get_jwt_identity()
  user = User.find_by_id(user_id)

  task_data = request_data["task"]
  task = task_schema.load(task_data)  # type: Task
  task.user = user

  res = Task.create(task)
  if not res:
    return jsonify(message="Task not created"), 400

  task = task_schema.dump(task)
  return jsonify(task=task), 200
