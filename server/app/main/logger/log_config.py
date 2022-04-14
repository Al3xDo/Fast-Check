
from logging.config import dictConfig


LOGGING_CONFIG = { 
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': { 
        'standard': { 
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': { 
        'default': { 
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stdout',  # Default is stderr
        },
        'info_rotating_file_handler': {
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'log/base_info.log',
            'mode': 'a',
            'maxBytes': 1048576,
            'backupCount': 10
        },
    },
    'loggers': { 
        'root': {  # root logger
            'handlers': ['default'],
            'level': 'WARNING',
            'propagate': False,
            'handlers': ['info_rotating_file_handler', 'default']
        },
        'debug_log': { 
            'handlers': ['default'],
            'level': 'INFO',
            'propagate': False,
            'handlers': ['info_rotating_file_handler']
        },
        '__main__': {  # if __name__ == '__main__'
            'handlers': ['default'],
            'level': 'DEBUG',
            'propagate': False,
            'handlers': ['info_rotating_file_handler', 'default']
        },
    } 
}
dictConfig(LOGGING_CONFIG)