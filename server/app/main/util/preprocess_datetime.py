import datetime
def getCurrentDate():
    return datetime.datetime.now().strftime("%d-%m-%Y")

def getCurrentDateTime():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
def combineTimeAndCurrentDate(time):
    current_date= datetime.datetime.now().date()
    current_datetime=datetime.datetime.combine(current_date, datetime.datetime.strptime(time, "%H:%M").time())
    return current_datetime
def getCurrentTime():
    return datetime.datetime.now().strftime("%H:%M:%S")
def convertStrToDateTime():
    pass
def compare2DateTime():
    pass
def preprocessTime(time):
    preprocesedTime = datetime.datetime.strptime(time, "%H:%M:%S")
    return preprocesedTime   