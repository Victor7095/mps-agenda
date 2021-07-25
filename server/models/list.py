from models.database import db
from models.user import User
from typing import List as PList
import datetime


class List(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  title = db.Column(db.String(100), nullable=False)
  date = db.Column(
      db.DateTime, default=datetime.datetime.utcnow, nullable=False)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                      unique=False,
                      nullable=False)
  user = db.relationship('User')

  def __repr__(self):
    return f'List {self.title}'

  def __init__(self, id=None, title=None, date=None, user=None):
    self.id = id
    self.title = title
    self.date = date
    self.user = user

  # CRUD methods
  @staticmethod
  def find_by_id(id: int) -> "List":
    return List.query.filter(List.id == id).first()

  @staticmethod
  def find_by_title(title: str, user: User) -> PList["List"]:
    return List.query.filter(List.title.like(title), List.user == user).all()

  @staticmethod
  def find_by_user(user: User) -> PList["List"]:
    return List.query.filter(List.user == user).all()

  # CRUD methods
  @staticmethod
  def create(item_list: "List", commit: bool = True) -> "List":
    try:
      db.session.add(item_list)
      if commit:
        db.session.commit()
      return item_list
    except Exception as e:
      return False

  @staticmethod
  def delete(item_list: "List", commit: bool = True) -> bool:
    try:
      db.session.delete(item_list)
      if commit:
        db.session.commit()
      return True
    except Exception:
      return False

  @staticmethod
  def update(item_list: "List", title: str = None, date: str = None,
             commit: bool = True) -> "List":
    try:
      item_list.title = title or item_list.title
      item_list.date = date or item_list.date
      if commit:
        db.session.commit()
      return item_list
    except Exception:
      return False
