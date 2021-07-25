from models.database import db
from models.user import User
from typing import List as PList
import datetime


class ListItem(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  title = db.Column(db.String(100), nullable=False)

  list_id = db.Column(db.Integer, db.ForeignKey('list.id'),
                      unique=False,
                      nullable=False)
  list = db.relationship('List')

  def __repr__(self):
    return f'ListItem {self.title}'

  def __init__(self, id=None, title=None, date=None, user=None):
    self.id = id
    self.title = title
    self.date = date
    self.user = user

  # CRUD methods
  @staticmethod
  def find_by_id(id: int) -> "ListItem":
    return ListItem.query.filter(ListItem.id == id).first()

  @staticmethod
  def find_by_title(title: str, user: User) -> PList["ListItem"]:
    return ListItem.query.filter(ListItem.title.like(title), ListItem.user == user).all()

  @staticmethod
  def find_by_user(user: User) -> PList["ListItem"]:
    return ListItem.query.filter(ListItem.user == user).all()

  # CRUD methods
  @staticmethod
  def create(item_list: "ListItem", commit: bool = True) -> "ListItem":
    try:
      db.session.add(item_list)
      if commit:
        db.session.commit()
      return item_list
    except Exception as e:
      return False

  @staticmethod
  def delete(item_list: "ListItem", commit: bool = True) -> bool:
    try:
      db.session.delete(item_list)
      if commit:
        db.session.commit()
      return True
    except Exception:
      return False

  @staticmethod
  def update(item_list: "ListItem", title: str = None, date: str = None,
             commit: bool = True) -> "ListItem":
    try:
      item_list.title = title or item_list.title
      item_list.date = date or item_list.date
      if commit:
        db.session.commit()
      return item_list
    except Exception:
      return False
