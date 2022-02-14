import unittest
import datetime
import logging

from app.main import db
from app.main.model.user import User
from app.test.base import BaseTestCase
import uuid
import unittest
import json
import sys
from app.main.service import config
from utils import register_user, login_user

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
            self.assertTrue(data['status'] == config.STATUS_SUCCESS)
            self.assertEqual(response.status_code, config.STATUS_CODE_SUCCESS)

if __name__ == '__main__':
    logging.basicConfig( stream=sys.stderr )
    logging.getLogger( "SomeTest.testSomething" ).setLevel( logging.DEBUG )
    unittest.main()