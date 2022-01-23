from flask_restplus.utils import default_id
from .. import db


class Room(db.Model):
    __tablename__ ='room'
    id= db.Column(db.String(150), primary_key=True,nullable=False)
    publicId= db.Column(db.String(150), nullable=True)  
    roomName= db.Column(db.String(100),nullable=False)
    timeSchedule= db.Column(db.Text)
    dateSchedule= db.Column(db.Text)
    code= db.Column(db.Text)
    password= db.Column(db.Text)
    participantNumber= db.Column(db.Integer, default="1")
    