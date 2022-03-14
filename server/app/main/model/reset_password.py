from .. import db


class ResetPassword(db.Model):
    __tablename__="reset_password"
    id= db.Column(db.String(150), primary_key=True,nullable=False, autoincrement=False)
    user_id=db.Column(db.String(150), db.ForeignKey(
        'user.id'), nullable=False)
    created_at= db.Column(db.DateTime, nullable=False,)
    is_used= db.Column(db.Boolean, default=False)
    user = db.relationship('User', backref=db.backref('user', lazy=True))