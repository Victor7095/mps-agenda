from models.database import ma
from models.task import Task
from marshmallow.utils import EXCLUDE


class TaskSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Task
    load_instance = True
    unknown = EXCLUDE

  id = ma.auto_field(dump_only=True)
  title = ma.auto_field(required=True)
  date = ma.auto_field(required=True)
  description = ma.auto_field(required=True)
  user = ma.auto_field(required=True)
