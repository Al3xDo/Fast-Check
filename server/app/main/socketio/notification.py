from .socketio import socketio
from flask_socketio import emit, join_room
clients=[]
@socketio.on('check')
def handle_message(data):
    print(data)
    print(clients)
    if data['isAdmin']:
        print('check')
        join_room(data['roomId'])
        emit("check", {"roomId": data['roomId']},room= data['roomId'], include_self=False)
    else:
        print("no check")
        join_room(data['roomId'])
    