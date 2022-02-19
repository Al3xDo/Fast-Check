import os
from app.main.model.user import User
import cv2
import numpy as np
from datetime import date
import base64
from PIL import Image
import cv2
import io


def get_JWT_identity(request):
    data = request.headers.get('Authorization')
    auth_token = str.replace(str(data), 'Bearer ', '')
    if auth_token:
        userId = User.decode_auth_token(auth_token)
        return userId

# preprocess and get face image


def from_file_to_list(image):
    image = np.fromfile(image, np.uint8)
    nparr = np.fromstring(image, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    # img= np.expand_dims(img, axis=0)
    img = img.astype("float32").tolist()
    return img


def from_file_to_arr(image):
    image = np.fromfile(image, np.uint8)
    nparr = np.fromstring(image, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    img = np.expand_dims(img, axis=0)
    img = img.astype("float32")
    return img


def get_face_image(face_image_dir):
    img = cv2.imread(face_image_dir)
    return img


def preprocess_image(image):
    img = cv2.resize(image, (224, 224))
    img = np.expand_dims(img, axis=0)
    img = img.astype("float32")
    return img


def preprocess_email(email):
    email = email.replace(".", "_")
    return email


def save_logs_image(email, imgA, LOG_IMAGES_FOLDER):
    current_time = date.today().strftime("%d-%m-%Y-%H-%M-%S")
    log_images = LOG_IMAGES_FOLDER + \
        "/" + email + "/" + str(current_time) + ".jpg"
    print(log_images)
    cv2.imwrite(log_images, imgA)


def detect_face(image):
    # cv2.imwrite("./save.jpg", image)
    face_cascade_dir = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(face_cascade_dir)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        roi_color = image[y:y+h, x:x+w]
        return roi_color
    return None


def get_response_image(imageDir):
    try:
        img = Image.open(imageDir, mode='r')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        my_encoded_img = base64.encodebytes(
            img_byte_arr.getvalue()).decode('ascii')
        return my_encoded_img
    except:
        img = Image.open("C:/WebLearning/Fast-Check/server/app/filesystem/attendance_status/not_exist.jpg", mode='r')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        my_encoded_img = base64.encodebytes(
            img_byte_arr.getvalue()).decode('ascii')
        return my_encoded_img
