import uuid
from .. import db


class AttendanceStatus(db.Model):
    __tablename__ = "attendance_status"
    id = db.Column(db.String(150), primary_key=True, nullable=False)
    participantId = db.Column(db.String(150), db.ForeignKey(
        'participants.id'), nullable=False)
    attendanceHistoryId= db.Column(db.String(150),db.ForeignKey(
        'attendance_history.id'), nullable=False)
    isPresent = db.Column(db.SmallInteger())
    AttendanceHistory = db.relationship(
        'AttendanceHistory', backref=db.backref('attendance_history', lazy=True))
    participant = db.relationship(
        'Participant', backref=db.backref('participant', lazy=True))

    def __init__(self, participantId, attendanceHistoryId, isPresent=False):
        self.id = str(uuid.uuid4())
        self.participantId = participantId
        self.attendanceHistoryId= attendanceHistoryId
        self.isPresent= isPresent

class AttendanceHistory(db.Model):
    __tablename__ = "attendance_history"
    id = db.Column(db.String(150), primary_key=True, nullable=False)
    roomId = db.Column(db.String(150), db.ForeignKey(
        'room.id'), nullable=False)
    date= db.Column(db.Text)
    timeStart= db.Column(db.Text)
    timeEnd= db.Column(db.Text)
    room = db.relationship(
        'Room', backref=db.backref('room_attendance', lazy=True))
    

    def __init__(self,roomId, date, timeStart, timeEnd):
        self.id = str(uuid.uuid4())
        self.roomId= roomId
        self.date= date 
        self.timeStart= timeStart
        self.timeEnd= timeEnd