from sqlalchemy.ext.hybrid import hybrid_property
from models.database import db
from models.user import User
from typing import List
import datetime


class Meeting(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  title = db.Column(db.String(100), nullable=False)
  date = db.Column(
      db.DateTime, default=datetime.datetime.utcnow, nullable=False)
  place = db.Column(db.String(11), nullable=True)
  link = db.Column(db.String(200), nullable=True)
  category = db.Column(db.String(200), nullable=True)
  observations = db.Column(db.String(200), nullable=True)

  created_by_user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                                 unique=False,
                                 nullable=False)
  created_by_user = db.relationship('User')

  guests = db.relationship(
      'User', secondary='user_meeting', lazy='subquery')

  def __repr__(self):
    return f'Meeting {self.title}'

  def __init__(self, id=None, title=None, date=None, place=None, category=None,
               link=None, observations=None, created_by_user=None):
    self.id = id
    self.title = title
    self.date = date
    self.place = place
    self.link = link
    self.category = category
    self.observations = observations
    self.created_by_user = created_by_user

  @hybrid_property
  def guests_count(self):
    return len(self.guests)

  # CRUD methods
  @staticmethod
  def find_by_id(id: int) -> "Meeting":
    return Meeting.query.filter(Meeting.id == id).first()

  @staticmethod
  def find_by_title(title: str, user: User) -> List["Meeting"]:
    return Meeting.query.filter(Meeting.title.like(title), Meeting.created_by_user == user).all()

  @staticmethod
  def find_by_user(user: User) -> List["Meeting"]:
    return Meeting.query.filter(Meeting.created_by_user == user).all()

  # CRUD methods
  @staticmethod
  def create(meeting: "Meeting", commit: bool = True) -> "Meeting":
    try:
      db.session.add(meeting)
      if commit:
        db.session.commit()
      return meeting
    except Exception as e:
      return False

  @staticmethod
  def delete(meeting: "Meeting", commit: bool = True) -> bool:
    try:
      db.session.delete(meeting)
      if commit:
        db.session.commit()
      return True
    except Exception:
      return False

  @staticmethod
  def update(meeting: "Meeting", title: str = None, date: str = None, place: str = None,
             link: str = None, category: str = None, observations: str = None,
             commit: bool = True) -> "Meeting":
    try:
      meeting.title = title or meeting.title
      meeting.date = date or meeting.date
      meeting.place = place or meeting.place
      meeting.link = link or meeting.link
      meeting.category = category or meeting.category
      meeting.observations = observations or meeting.observations
      if commit:
        db.session.commit()
      return meeting
    except Exception:
      return False
