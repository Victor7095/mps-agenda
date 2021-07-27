from models.database import ma
from models.meeting import Meeting
from marshmallow import fields
from marshmallow.utils import EXCLUDE


class MeetingSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Meeting
    load_instance = True
    unknown = EXCLUDE

  id = ma.auto_field(dump_only=True)
  title = ma.auto_field(required=True)
  date = ma.auto_field(required=True)
  place = ma.auto_field(required=False)
  link = ma.auto_field(required=False)
  category = ma.auto_field(required=True)
  observations = ma.auto_field(required=False)
  created_by_user = ma.auto_field(required=False)
  guests_count = fields.Int(dump_only=True)
