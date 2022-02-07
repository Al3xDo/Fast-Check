from .socketio import socketio
from flask_socketio import emit, join_room
clients=[]
@socketio.on('check')
def handle_message(data):
    if data['isAdmin']:
        join_room(data['roomId'])
        emit("check", {"roomId": data['roomId']},room= data['roomId'], include_self=False)
    else:
        join_room(data['roomId'])
    