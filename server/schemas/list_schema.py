from models.database import ma
from models.list import List
from marshmallow.utils import EXCLUDE


class ListSchema(ma.SQLAlchemySchema):
  class Meta:
    model = List
    load_instance = True
    unknown = EXCLUDE

  id = ma.auto_field(dump_only=True)
  title = ma.auto_field(required=True)
  user = ma.auto_field(required=True)
