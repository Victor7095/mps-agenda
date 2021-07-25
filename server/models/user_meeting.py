from models.database import db


class UserMeeting(db.Model):
  meeting_id = db.Column(db.Integer, db.ForeignKey(
      'meeting.id'), primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(
      'user.id'), primary_key=True)
