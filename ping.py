import time
import requests

while True:
    requests.get('http://localhost:3001/user/ping')
    time.sleep(1)