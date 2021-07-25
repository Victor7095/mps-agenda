from models.database import db
from models.user import User
from typing import List
import datetime


class Task(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  title = db.Column(db.String(100), nullable=False)
  date = db.Column(
      db.DateTime, default=datetime.datetime.utcnow, nullable=False)
  description = db.Column(db.String(300), nullable=True)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                      unique=False,
                      nullable=False)
  user = db.relationship('User')

  def __repr__(self):
    return f'Task {self.title}'

  def __init__(self, id=None, title=None, date=None, description=None, user=None):
    self.id = id
    self.title = title
    self.date = date
    self.description = description
    self.user = user

  # CRUD methods
  @staticmethod
  def find_by_id(id: int) -> "Task":
    return Task.query.filter(Task.id == id).first()

  @staticmethod
  def find_by_title(title: str, user: User) -> List["Task"]:
    return Task.query.filter(Task.title.like(title), Task.user == user).all()

  @staticmethod
  def find_by_user(user: User) -> List["Task"]:
    return Task.query.filter(Task.user == user).all()

  # CRUD methods
  @staticmethod
  def create(task: "Task", commit: bool = True) -> "Task":
    try:
      db.session.add(task)
      if commit:
        db.session.commit()
      return task
    except Exception as e:
      return False

  @staticmethod
  def delete(task: "Task", commit: bool = True) -> bool:
    try:
      db.session.delete(task)
      if commit:
        db.session.commit()
      return True
    except Exception:
      return False

  @staticmethod
  def update(task: "Task", title: str = None, date: str = None,
             description=None, commit: bool = True) -> "Task":
    try:
      task.title = title or task.title
      task.date = date or task.date
      if commit:
        db.session.commit()
      return task
    except Exception:
      return False
