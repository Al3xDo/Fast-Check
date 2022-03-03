import unittest
from app.test.base import BaseTestCase
from app.main.service.config import *
import os
class TestPath(BaseTestCase):
    def test_path(self):
        PATHS= [AVATAR_PATH, ATTENDANCE_STATUS_PATH,FACE_IMAGES_PATH, IMAGES_PATH ]
        self.assertTrue(os.path.exists(FILESYSTEM_PATH))
        for p in PATHS:
            self.assertTrue(os.path.exists(os.path.join(FILESYSTEM_PATH,p)))

if __name__ == '__main__':
    unittest.main()