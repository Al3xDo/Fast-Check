from celery_sqlalchemy_scheduler.models import PeriodicTask, IntervalSchedule
from celery_sqlalchemy_scheduler.session import SessionManager
import json
from app.main import beat_dburi
session_manager = SessionManager()
engine, Session = session_manager.create_session(beat_dburi)
session = Session()

# executes every 10 seconds.
def schedule_check_attendance(timeStart, timeEnd, dateCreated, dateDelta):
    schedule = session.query(IntervalSchedule).filter_by(every=10, period=IntervalSchedule.SECONDS).first()
    from datetime import datetime, timedelta
    periodic_task = PeriodicTask(
        interval=schedule,                  # we created this above.
        name='Importing contacts',          # simply describes this periodic task.
        task='app.main.tasks.import_contacts',  # name of task.
        args=json.dumps(['arg1', 'arg2']),
        kwargs=json.dumps({
        'be_careful': True,
        }))
    if not schedule:
        schedule = IntervalSchedule(every=10, period=IntervalSchedule.SECONDS)
        session.add(schedule)
        session.commit()