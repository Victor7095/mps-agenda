from models.database import ma
from models.user import User
from marshmallow import fields
from marshmallow import fields, validates, ValidationError, post_load, validate
from zxcvbn import zxcvbn


class UserSchema(ma.SQLAlchemySchema):
  class Meta:
    model = User

  id = ma.auto_field(dump_only=True)
  name = ma.auto_field(required=True)
  email = fields.Email(required=True)
  username = ma.auto_field(required=True)
  _password = ma.auto_field(required=True, load_only=True, validate=validate.Length(min=8),
                            data_key="password", attribute="password")

  @validates("_password")
  def validate_password(self, value):
    if zxcvbn(value)["score"] < 4:
      raise ValidationError(
          "Password not strong enough! Please try a mix of numbers, letters and symbols")

  @post_load
  def make_user(self, data, **kwargs):
    return User(**data)
