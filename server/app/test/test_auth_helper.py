import unittest
import datetime

from app.main import db
from app.main.model.user import User
from app.test.base import BaseTestCase
import uuid
import unittest
import json
from app.main.service import config

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


class TestAuthBlueprint(BaseTestCase):

    def test_registered_user_login(self):
            """ Test for login of registered-user login """
            with self.client:
                # user registration
                user_response = register_user(self)
                response_data = json.loads(user_response.data.decode())
                self.assertEqual(response_data[config.STATUS], config.STATUS_SUCCESS)
                self.assertEqual(user_response.status_code, config.STATUS_CODE_CREATED)

                # registered user login
                login_response = login_user(self)
                data = json.loads(login_response.data.decode())
                self.assertTrue(data['token'])
                self.assertEqual(login_response.status_code, config.STATUS_CODE_SUCCESS)

    def test_valid_logout(self):
        """ Test for logout before token expires """
        with self.client:
            # user registration
            user_response = register_user(self)
            # registered user login
            login_response = login_user(self)
            # valid token logout
            response = self.client.post(
                '/auth/logout',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        login_response.data.decode()
                    )['token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()