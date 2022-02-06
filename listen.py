import sseclient

messages = sseclient.SSEClient('http://localhost:3001/user/listen')

for msg in messages:
    print(msg)