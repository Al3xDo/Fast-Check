import json
from PIL import Image
import cv2
import base64
import io
import numpy as np
# Take in base64 string and return cv image
def stringToImage(base64_string):
    imgdata = base64.b64decode(str(base64_string))
    image = Image.open(io.BytesIO(imgdata))
    return image
def register_user(self, email="test123@gmail.com", password="123"):
    return self.client.post(
        '/user/signup',
        data=json.dumps(dict(
            email=email,
            password=password
        )),
        content_type='application/json'
    )


def login_user(self, email="test123@gmail.com", password="123"):
    return self.client.post(
        '/auth/login',
        data=json.dumps(dict(
            email=email,
            password=password
        )),
        content_type='application/json'
    )
def call_api(self, endpoint, method='GET', data={}, token=None, content_type='application/json'):
    if method == 'GET':
        return self.client.get(
            endpoint,
            headers=dict(
                    Authorization='Bearer ' + token),
            data=data,
            content_type=content_type
        )
    if method == 'POST':
        return self.client.post(
            endpoint,
            headers=dict(
                    Authorization='Bearer ' + token),
            data=data,
            content_type=content_type
        )
    if method == 'PUT':
        return self.client.put(
            endpoint,
            headers=dict(
                    Authorization='Bearer ' + token),
            data=data,
            content_type=content_type
        )
    if method == "DELETE":
        return self.client.delete(
            endpoint,
            headers=dict(
                    Authorization='Bearer ' + token),
            data=data,
            content_type=content_type
        )
def call_api_upload_image(self, endpoint, method='POST', data={}, token=None):
    return self.client.post(
        endpoint,
        headers=dict(
                Authorization='Bearer ' + token),
        data=data,
        content_type="multipart/form-data"
    )
def create_get_token(self, email="test123@gmail.com", password='123456'):
    user_response = register_user(self, email, password)
    user_response = login_user(self, email, password)
    response_data = json.loads(user_response.data.decode())
    return response_data['token']

def convert_res_to_dict(user_response):
    return json.loads(user_response.data.decode())