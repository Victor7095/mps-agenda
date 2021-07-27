from typing import List
from models.database import db
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt
from sqlalchemy import or_


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), unique=True, nullable=False)
  username = db.Column(db.String(32), unique=True, nullable=False)
  _password = db.Column("password", db.String(120),
                        unique=True, nullable=False)

  hosted_meetings = db.relationship(
      'Meeting', lazy='subquery')

  meetings = db.relationship(
      'Meeting', secondary='user_meeting', lazy='subquery')

  lists = db.relationship(
      'List', lazy='subquery')

  tasks = db.relationship(
      'Task', lazy='subquery')

  def __repr__(self):
    return f'User {self.name}'

  def __init__(self, id=None, name=None, email=None,
               username=None, password=None):
    self.id = id
    self.name = name
    self.email = email
    self.username = username
    self.password = password

  @hybrid_property
  def password(self):
    return self._password.encode('utf-8')

  # Encrypt password
  @password.setter
  def password(self, plain_text: str):
    plain_text = plain_text.encode("utf-8")
    pw_hash = bcrypt.hashpw(plain_text, bcrypt.gensalt())
    pw_hash = pw_hash.decode("utf-8", "ignore")
    self._password = pw_hash

  # CRUD methods
  @staticmethod
  def find_by_id(id: int) -> "User":
    return User.query.filter(User.id == id).first()

  @staticmethod
  def find_by_email(email: str) -> "User":
    return User.query.filter(User.email == email).first()

  @staticmethod
  def find_by_username(username: str) -> "User":
    return User.query.filter(User.username == username).first()

  # CRUD methods
  @staticmethod
  def search(user_id: int, name: str) -> List["User"]:
    name = "%{}%".format(name)
    return User.query.filter(User.id != user_id, or_(User.username.like(name), User.name.like(name))).limit(5).all()

  # CRUD methods
  @staticmethod
  def create(user: "User", commit: bool = True) -> "User":
    try:
      db.session.add(user)
      if commit:
        db.session.commit()
      return user
    except Exception as e:
      return False

  @staticmethod
  def delete(user: "User", commit: bool = True) -> bool:
    try:
      db.session.delete(user)
      if commit:
        db.session.commit()
      return True
    except Exception:
      return False

  @staticmethod
  def update(user: "User", name: str = "", email: str = "",
             username: str = "", password: str = "",
             commit: bool = True) -> "User":
    try:
      user.name = name or user.name
      user.email = email or user.email
      user.username = username or user.username
      if password:
        user.password = password
      if commit:
        db.session.commit()
      return user
    except Exception as e:
      print(e)
      return False

  # Compare passwords
  def check_password(self, password: str) -> bool:
    password = password.encode('utf-8')
    return bcrypt.checkpw(password, self.password)
