import datetime
def getCurrentDate():
    return datetime.datetime.now().strftime("%d-%m-%Y")

def getCurrentDateTime():
    return datetime.datetime.now().strftime("%d-%m-%Y-%H:%M:%S")
def getCurrentTime():
    return datetime.datetime.now().strftime("%H:%M:%S")
def convertStrToDateTime():
    pass
def compare2DateTime():
    pass
def preprocessTime(time):
    preprocesedTime = datetime.datetime.strptime(time, "%H:%M:%S")
    return preprocesedTime   