from .. import db
from flask_bcrypt import generate_password_hash, check_password_hash
import datetime
import jwt
from app.main.model.blacklist import BlacklistToken
from ..config import key
# thêm => tạo code gửi cho thành viên
# xóa => xóa class
# Sửa => kick, thêm thành viên nhất định

class User(db.Model):
    __tablename__="user"
    id= db.Column(db.String(150), primary_key=True,nullable=False, autoincrement=False)
    name= db.Column(db.String(80))
    email= db.Column(db.String(80), nullable=False, unique=True)
    password_hash= db.Column(db.String(100), nullable=False, unique=True)
    hasAvatar= db.Column(db.Boolean(), default=False)

    @property
    def password(self):
        raise AttributeError('password: write only')
    
    @password.setter
    def password(self,password):
        self.password_hash= generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return check_password_hash(self.password_hash,password)

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }

            return jwt.encode(
                payload,
                key,
                algorithm='HS256'
            ).decode('utf-8')
        except Exception as e:
            return e
    @staticmethod  
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, key)
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
    # def __repr__(self):
    #     return "<User '{}'>".format(self.email)