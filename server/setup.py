import os
from app.main.service.config import *

PATHS= [FILESYSTEM_PATH, AVATAR_PATH, ATTENDANCE_STATUS_PATH,FACE_IMAGES_PATH, IMAGES_PATH ]
def create_folder_if_not_exist(path):
    if (not os.path.exists(path)):
        print("creating folder ", path)
        os.mkdir(path)
create_folder_if_not_exist(FILESYSTEM_PATH)
for path in [FACE_IMAGES_PATH, 
            IMAGES_PATH, 
            AVATAR_PATH, 
            ATTENDANCE_STATUS_PATH]:
    create_folder_if_not_exist(os.path.join(FILESYSTEM_PATH,path))
print("Done")
