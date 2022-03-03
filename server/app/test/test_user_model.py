from io import BytesIO
import os
import unittest
from app.main import db
from app.main.model.user import User
from app.test.base import BaseTestCase
import uuid
import json
from app.test.utils import call_api, convert_res_to_dict
from app.main.service import config
import logging
from app.main.util.utils import get_response_image
from app.main.service.config import FILESYSTEM_PATH, IMAGES_PATH
from app.main.service.config import DEFAULT_AVATAR_PATH
from utils import create_get_token
class TestUserModel(BaseTestCase):
    logger = logging.getLogger(__name__)
    logging.basicConfig(format = '%(asctime)s %(module)s %(levelname)s: %(message)s',
                    datefmt = '%m/%d/%Y %I:%M:%S %p', level = logging.INFO)
    def test_encode_auth_token(self):
        user = User(
            id= str(uuid.uuid4()),
            email='test@test.com',
            password='test'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))

    def test_decode_auth_token(self):
        user = User(
            id= str(uuid.uuid4()),
            email='test@test.com',
            password='test'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))
    def test_unauthorize_user(self):
        with self.client:
            user_response= call_api(self,'/user/',token="123312312312312")
            # self.assertNotEqual(user_response.status_code, 200)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_UNAUTHORIZED, msg=convert_res_to_dict(user_response))
    def test_get_user(self):
        with self.client:
            user_token= create_get_token(self)
            user_response= call_api(self,'/user/',token=user_token)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_SUCCESS)
            data= convert_res_to_dict(user_response)
            self.assertIn('name', data)
            self.assertIn('email', data)
            self.assertNotIn('password', data)
            true_image_dir=DEFAULT_AVATAR_PATH
            true_image= get_response_image(true_image_dir)
            self.assertEqual(data['avatar'], true_image)
    def test_update_user(self):
        with self.client:
            user_token= create_get_token(self)
            data= dict(name='test_update_user')
            data_json=json.dumps(data)
            user_response=call_api(self,'/user/', 'PUT', data=data_json,token=user_token)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_SUCCESS, msg= convert_res_to_dict(user_response))
            user_response=call_api(self,'/user/', 'GET',token=user_token)
            update_data= convert_res_to_dict(user_response)
            self.assertEqual(update_data['name'], data['name'] )
            self.assertIn('email', update_data)
            self.assertNotIn('password', update_data)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_SUCCESS)
    def test_delete_user(self):
        with self.client:
            user_token= create_get_token(self)
            user_response=call_api(self,'/user/', 'DELETE', token=user_token)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_SUCCESS, msg= convert_res_to_dict(user_response))

            user_response=call_api(self,'/user/', 'GET', token=user_token)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_UNAUTHORIZED)
            data= convert_res_to_dict(user_response)
            self.assertEqual(data[config.MESSAGE], config.MSG_NOT_VALID_TOKEN)
    def test_upload_avatar_image(self):
        with self.client:
            user_token= create_get_token(self)
            # self.assertEqual(os.getcwd(), "", msg= os.getcwd())
            true_image= get_response_image("./app/test/asset/images/test_avatar_image.jpg")
            with open("./app/test/asset/images/test_avatar_image.jpg", 'rb') as test_img:
                test_img_stringIO= BytesIO(test_img.read())
            user_response= call_api(self,'/user/uploadAvatar', 'POST', data={
                "image": (test_img_stringIO, 'test_img.jpg')
            }, token=user_token, content_type="multipart/form-data")
            self.assertEqual(user_response.status_code, config.STATUS_CODE_ACCEPTED)
            # check if avatar has been saved
            user_response=call_api(self,'/user/', 'GET',token=user_token)
            data= convert_res_to_dict(user_response)
            self.assertEqual(data['avatar'], true_image)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_SUCCESS)
    def test_upload_wrong_file(self):
        # test upload wrong filetype
        with self.client:
            user_token= create_get_token(self)
            with open("./app/test/asset/images/test_avatar_image.jpg", 'rb') as test_img:
                test_img_stringIO= BytesIO(test_img.read())
            user_response= call_api(self,'/user/uploadAvatar', 'POST', data={
                "image": (test_img_stringIO, 'test_img.pdf')
            }, token=user_token, content_type="multipart/form-data")
            data= convert_res_to_dict(user_response)
            self.assertEqual(user_response.status_code, config.STATUS_CODE_NOT_ACCEPTABLE)
            self.assertEqual(data[config.MESSAGE], config.MSG_FILETYPE_IS_NOT_ALLOWED)
    def test_upload_sample_image(self):
        # with self.client:
        #     user_token= create_get_token(self)
        #     user_response= call_api('/user',token=user_token)
        #     data= convert_res_to_dict(user_response)
        #     data['name'] = "test_update_user"
        #     data=json.dumps(data)
        #     call_api('/user', 'PUT', data=data,token=user_token)
        #     self.assertEqual('name', data['name'])
        #     self.assertIn('email', data)
        #     self.assertNotIn('password', data)
        #     self.assertEqual('avatar', None)
        #     self.assertEqual(user_response.status_code, config.STATUS_CODE_SUCCESS)
        pass


if __name__ == '__main__':
    unittest.main()