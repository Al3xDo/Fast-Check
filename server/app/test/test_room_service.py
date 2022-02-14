# import unittest

# from app.main.model.user import User
# from app.test.base import BaseTestCase
# import json
# from app.main.service import config
# from app.test.util import create_room, get_rooms, register_and_login_user
# class TestRoomService(BaseTestCase):

#     def test_add_user(self):
#         return            
#     def test_remove_user(self):
#         return
#     def test_create_rooms(self):
#         with self.client:
#             user_token= register_and_login_user(self)
#             response= create_room(self, user_token)
#             # response_data = json.loads(response.data.decode())
#             self.assertEqual(response.status_code, config.STATUS_CODE_CREATED)
#     def test_get_room(self):
#         with self.client:
#             user_token= register_and_login_user(self)
#             response= get_rooms(self,user_token)
#             self.assertEqual(response.status_code, config.STATUS_CODE_NOT_FOUND)
#             create_room(self,user_token)
#             response= get_rooms(self,user_token)
#             self.assertEqual(response.status_code, config.STATUS_CODE_SUCCESS)
#     def test_update_room(self):
#         return
#     def test_delete_room(self):
#         return

# if __name__ == '__main__':
#     unittest.main()
