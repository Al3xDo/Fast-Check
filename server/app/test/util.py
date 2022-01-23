import json

def register_user(self):
    return self.client.post(
        '/user/signup',
        data=json.dumps(dict(
            email='example@gmail.com',
            password='123456'
        )),
        content_type='application/json'
    )


def login_user(self):
    return self.client.post(
        '/auth/login',
        data=json.dumps(dict(
            email='example@gmail.com',
            password='123456'
        )),
        content_type='application/json'
    )

def register_and_login_user(self):
    register_user(self)
    login_response= login_user(self)
    token=json.loads(login_response.data.decode())['token']
    return token

def create_room(self, token):
    return self.client.post(
        '/room/create',
        headers=dict(
                    Authorization='Bearer ' + token),
        data=json.dumps(dict(
            name='phòng 1',
            dateSchedule="21/10/2021",
            timeSchedule="10:45pm"
        )),
        content_type='application/json',
    )
def get_rooms(self, token):
    return self.client.get(
        '/rooms',
        headers=dict(
            Authorization='Bearer'  + token))