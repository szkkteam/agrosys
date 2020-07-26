#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
from datetime import timedelta

# Pip package imports
import redis
from appdirs import AppDirs

# Internal package imports
from backend.utils.date import utcnow

# Application name and directory setup
APP_NAME = 'flask-starter'
app_dirs = AppDirs(APP_NAME)
APP_CACHE_FOLDER = app_dirs.user_cache_dir
APP_DATA_FOLDER = app_dirs.user_data_dir

# Flask assets folder setup
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
TEMPLATE_FOLDER = os.path.join(PROJECT_ROOT, 'backend', 'templates')
STATIC_FOLDER = os.environ.get('FLASK_STATIC_FOLDER', os.path.join(PROJECT_ROOT, 'static'))

STATIC_URL_PATH = '/static' # serve asset files in static/ at /static/

# list of bundle modules to register with the app, in dot notation
BUNDLES = [
    'backend.admin',
    'backend.permissions',
    'backend.security',
    'backend.contrib.contact_submission',
    'backend.contrib.newsletter_subscribe',
    'backend.site',
    'backend.farm_management',
    'backend.field',
    'backend.production',
    'backend.crop',
]

# ordered list of extensions to register before the bundles
# syntax is import.name.in.dot.module.notation:extension_instance_name
EXTENSIONS = [
    'backend.extensions:session',               # should be first
    'backend.extensions:csrf',                  # should be second
    'backend.extensions:db',
    'backend.extensions:alembic',               # must come after db
    'backend.extensions.celery:celery',
    'backend.extensions.mail:mail',
    'backend.extensions.marshmallow:ma',        # must come after db
    'backend.extensions.security:security',     # must come after celery and mail
    'backend.extensions.debug:toolbar',
    'backend.extensions.babel:babel',
    'backend.extensions.assets:assets',
    'backend.extensions.flask_s3:s3',
]

# list of extensions to register after the bundles
# syntax is import.name.in.dot.module.notation:extension_instance_name
DEFERRED_EXTENSIONS = [
    'backend.extensions.api:api',
    'backend.extensions.admin:admin',
    'backend.extensions.permissions:permissions',
]


def get_boolean_env(name, default):
    default = 'true' if default else 'false'
    return os.getenv(name, default).lower() in ['true', 'yes', '1']


class BaseConfig(object):
    ##########################################################################
    # flask                                                                  #
    ##########################################################################
    DEBUG = get_boolean_env('FLASK_DEBUG', False)
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'not-secret-key')  # FIXME
    STRICT_SLASHES = False
    BUNDLES = BUNDLES

    ##########################################################################
    # session/cookies                                                        #
    ##########################################################################
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.from_url(os.environ.get('REDISCLOUD_URL')) if 'REDISCLOUD_URL' in os.environ else redis.Redis(
        host=os.getenv('FLASK_REDIS_HOST', '127.0.0.1'),
        port=int(os.getenv('FLASK_REDIS_PORT', 6379)),
    )
    SESSION_PROTECTION = 'strong'
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_HTTPONLY = True

    # SECURITY_TOKEN_MAX_AGE is fixed from time of token generation;
    # it does not update on refresh like a session timeout would. for that,
    # we set (the ironically named) PERMANENT_SESSION_LIFETIME
    PERMANENT_SESSION_LIFETIME = timedelta(days=2)

    ##########################################################################
    # database                                                               #
    ##########################################################################
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    ALEMBIC = {
        'script_location': os.path.join(PROJECT_ROOT, 'migrations'),
    }

    ##########################################################################
    # celery                                                                 #
    ##########################################################################
    CELERY_BROKER_URL = os.environ.get('REDIS_URL') if 'REDIS_URL' in os.environ else 'redis://{host}:{port}/0'.format(
        host=os.getenv('FLASK_REDIS_HOST', '127.0.0.1'),
        port=os.getenv('FLASK_REDIS_PORT', 6379),
    )
    CELERY_RESULT_BACKEND = os.environ.get('REDIS_URL') if 'REDIS_URL' in os.environ else CELERY_BROKER_URL
    CELERY_ACCEPT_CONTENT = ('json', 'pickle')

    ##########################################################################
    # mail                                                                   #
    ##########################################################################
    MAIL_ADMINS = ('flaskstarter@example.com',)  # FIXME
    MAIL_SERVER = os.environ.get('FLASK_MAIL_HOST', 'localhost')
    MAIL_PORT = int(os.environ.get('FLASK_MAIL_PORT', 25))
    MAIL_DEBUG = False # To prevent celery outputting warning messages
    MAIL_USE_TLS = get_boolean_env('FLASK_MAIL_USE_TLS', False)
    MAIL_USE_SSL = get_boolean_env('FLASK_MAIL_USE_SSL', False)
    MAIL_USERNAME = os.environ.get('FLASK_MAIL_USERNAME', None)
    MAIL_PASSWORD = os.environ.get('FLASK_MAIL_PASSWORD', None)
    MAIL_DEFAULT_SENDER = (
        os.environ.get('FLASK_MAIL_DEFAULT_SENDER_NAME', 'Flask Starter'),
        os.environ.get('FLASK_MAIL_DEFAULT_SENDER_EMAIL',
                       f"noreply@{os.environ.get('FLASK_DOMAIN', 'localhost:5000')}")
    )

    ##########################################################################
    # CSRF token lifetime                                                    #
    ##########################################################################
    WTF_CSRF_TIME_LIMIT = None

    ##########################################################################
    # security                                                               #
    ##########################################################################
    SECURITY_DATETIME_FACTORY = utcnow

    # specify which user field attributes can be used for login
    SECURITY_USER_IDENTITY_ATTRIBUTES = ['email', 'username']

    # NOTE: itsdangerous "salts" are not normal salts in the cryptographic
    # sense, see https://pythonhosted.org/itsdangerous/#the-salt
    SECURITY_PASSWORD_SALT = os.environ.get('FLASK_SECURITY_PASSWORD_SALT',
                                            'security-password-salt')

    # disable flask-security's use of .txt templates (instead we
    # generate the plain text from the html message)
    SECURITY_EMAIL_PLAINTEXT = False

    # enable forgot password functionality
    SECURITY_RECOVERABLE = True

    # enable email confirmation before allowing login
    SECURITY_CONFIRMABLE = True

    # this setting is parsed as a kwarg to timedelta, so the time unit must
    # always be plural
    SECURITY_CONFIRM_EMAIL_WITHIN = '7 days'  # default 5 days

    # urls for the *frontend* router
    SECURITY_CONFIRM_ERROR_VIEW = '/sign-up/resend-confirmation-email'
    SECURITY_POST_CONFIRM_VIEW = '/?welcome'

    ##########################################################################
    # debug                                                               #
    ##########################################################################
    # This mut be set to False during testing
    DEBUG_TB_INTERCEPT_REDIRECTS = False

    ##########################################################################
    # Babel                                                                  #
    ##########################################################################
    LANGUAGES =  {
        'en': 'EN',
        'hu': 'HU',
        'de': 'DE',
    }
    BABEL_TRANSLATION_DIRECTORIES = 'backend/i18n'
    BABEL_DEFAULT_LOCALE = 'en'

    ##########################################################################
    # Google Analytics                                                       #
    ##########################################################################
    GOOGLE_ANALYTICS_TRACKING_ID = os.environ.get('GOOGLE_ANALYTICS_TRACKING_ID', '')

    ##########################################################################
    # Flask - Assets                                                         #
    ##########################################################################
    ASSETS_DEBUG = get_boolean_env('FLASK_DEBUG', False)

    ##########################################################################
    # Flask - S3                                                         #
    ##########################################################################
    FLASKS3_BUCKET_NAME = os.environ.get('ASSETS_BUCKET_NAME', 'flask-starter-assets')
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    FLASKS3_REGION = os.environ.get('AWS_REGION')
    FLASKS3_USE_HTTPS = get_boolean_env('SESSION_COOKIE_SECURE', True)
    FLASKS3_DEBUG = get_boolean_env('FLASK_DEBUG', True)
    FLASKS3_GZIP_ONLY_EXTS = ['.js', '.css']
    FLASKS3_FILEPATH_HEADERS = {
        r'.css$': {
            'Content-Type': 'text/css',
        },
        r'.js$' : {
            'Content-Type': 'text/javascript',
        }

    }
    ##########################################################################
    # Mapbox - Static Map                                                    #
    ##########################################################################
    MAPBOX_ACCESS_KEY = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
    MAPBOX_STATIC_WIDTH = "300"
    MAPBOX_STATIC_HEIGHT = "200"
    MAPBOX_STATIC_SHOW_ATTRIBUTION = False
    MAPBOX_STATIC_SHOW_LOGO = True
    MAPBOX_STATIC_PROPERTIES = {
        "stroke": "#ffffff",
        "stroke-width": 3,
        "stroke-opacity": 1,
        "fill": "#2fb3eb",
        "fill-opacity": 0.2
    }

class ProdConfig(BaseConfig):
    ##########################################################################
    # flask                                                                  #
    ##########################################################################
    SERVER_NAME = os.environ.get('FLASK_DOMAIN', 'flask-starter.herokuapp.com')
    ENV = 'prod'
    DEBUG = get_boolean_env('FLASK_DEBUG', False)

    ##########################################################################
    # database                                                               #
    ##########################################################################
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL','postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}'.format(
        user=os.environ.get('FLASK_DATABASE_USER', 'flask_api'),
        password=os.environ.get('FLASK_DATABASE_PASSWORD', 'flask_api'),
        host=os.environ.get('FLASK_DATABASE_HOST', '127.0.0.1'),
        port=os.environ.get('FLASK_DATABASE_PORT', 5432),
        db_name=os.environ.get('FLASK_DATABASE_NAME', 'flask_api'),
    ))

    ##########################################################################
    # session/cookies                                                        #
    ##########################################################################
    SESSION_COOKIE_DOMAIN = os.environ.get('FLASK_DOMAIN', 'agrosys.herokuapp.com')
    SESSION_COOKIE_SECURE = get_boolean_env('SESSION_COOKIE_SECURE', True)

    # SECURITY_TOKEN_MAX_AGE is fixed from time of token generation;
    # it does not update on refresh like a session timeout would. for that,
    # we set (the ironically named) PERMANENT_SESSION_LIFETIME
    PERMANENT_SESSION_LIFETIME = timedelta(days=2)

    ##########################################################################
    # Flask - Assets                                                         #
    ##########################################################################
    ASSETS_AUTO_BUILD = False
    FLASK_ASSETS_USE_S3 = True

    ##########################################################################
    # Flask - S3                                                         #
    ##########################################################################
    FLASKS3_ACTIVE = True
    FLASKS3_GZIP = False

class DevConfig(BaseConfig):
    ##########################################################################
    # flask                                                                  #
    ##########################################################################
    ENV = 'dev'
    DEBUG = get_boolean_env('FLASK_DEBUG', True)
    #SERVER_NAME = 'localhost:5000'
    # EXPLAIN_TEMPLATE_LOADING = True

    ##########################################################################
    # session/cookies                                                        #
    ##########################################################################
    SESSION_COOKIE_SECURE = False

    # SECURITY_TOKEN_MAX_AGE is fixed from time of token generation;
    # it does not update on refresh like a session timeout would. for that,
    # we set (the ironically named) PERMANENT_SESSION_LIFETIME
    PERMANENT_SESSION_LIFETIME = timedelta(days=2)

    ##########################################################################
    # database                                                               #
    ##########################################################################
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}'.format(
        user=os.environ.get('FLASK_DATABASE_USER', 'flask_api'),
        password=os.environ.get('FLASK_DATABASE_PASSWORD', 'flask_api'),
        host=os.environ.get('FLASK_DATABASE_HOST', '127.0.0.1'),
        port=os.environ.get('FLASK_DATABASE_PORT', 5432),
        db_name=os.environ.get('FLASK_DATABASE_NAME', 'agro_dev'),
    )
    SQLALCHEMY_ECHO = True

    ##########################################################################
    # mail                                                                   #
    ##########################################################################
    MAIL_PORT = 1025  # MailHog
    MAIL_DEFAULT_SENDER = ('Agro Systems', 'noreply@localhost')

    ##########################################################################
    # security                                                               #
    ##########################################################################
    SECURITY_CONFIRMABLE = True
    SECURITY_CONFIRM_EMAIL_WITHIN = '1 minutes'  # for testing
    ##########################################################################
    # debug                                                               #
    ##########################################################################
    DEBUG_TB_TEMPLATE_EDITOR_ENABLED = True

    ##########################################################################
    # Flask - Assets                                                         #
    ##########################################################################
    ASSETS_AUTO_BUILD = True
    FLASK_ASSETS_USE_S3 = False  #False

    ##########################################################################
    # Flask - S3                                                         #
    ##########################################################################
    FLASKS3_USE_HTTPS = False
    FLASKS3_ACTIVE = False # TODO: Remove this when testing S3
    FLASKS3_GZIP = False

class TestConfig(BaseConfig):
    TESTING = True
    DEBUG = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    #SQLALCHEMY_DATABASE_URI = 'sqlite://'  # :memory:
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}'.format(
        user=os.environ.get('FLASK_DATABASE_USER', 'flask_api'),
        password=os.environ.get('FLASK_DATABASE_PASSWORD', 'flask_api'),
        host=os.environ.get('FLASK_DATABASE_HOST', '127.0.0.1'),
        port=os.environ.get('FLASK_DATABASE_PORT', 5432),
        db_name='unit_test',
    )

    WTF_CSRF_ENABLED = False
    SECURITY_PASSWORD_HASH_OPTIONS = dict(bcrypt={'rounds': 4})
    SECURITY__SEND_MAIL_TASK = None
    DEBUG_TB_INTERCEPT_REDIRECTS = False
