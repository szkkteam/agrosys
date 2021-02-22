import os
import redis

from appdirs import AppDirs
from datetime import timedelta
from flask_unchained import BundleConfig, get_boolean_env, url_for
from werkzeug.local import LocalProxy


BUNDLES = [
    'flask_unchained.bundles.controller',
    'flask_unchained.bundles.admin',
    'flask_unchained.bundles.api',
    'flask_unchained.bundles.graphene',
    'flask_unchained.bundles.mail',
    'flask_unchained.bundles.celery',  # must be after mail bundle to send async email
    'flask_unchained.bundles.session',
    'flask_unchained.bundles.sqlalchemy',

    #'bundles.blog',
    'bundles.security',
    'backend',  # app bundle must be last
]


class Config(BundleConfig):
    ##########################################################################
    # flask                                                                  #
    ##########################################################################
    DEBUG = get_boolean_env('FLASK_DEBUG', False)
    FLASH_MESSAGES = False
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'not-secret-key')  # FIXME

    app_dirs = AppDirs('agrosys')
    APP_CACHE_FOLDER = app_dirs.user_cache_dir
    APP_DATA_FOLDER = app_dirs.user_data_dir

    PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
    STATIC_FOLDER = os.environ.get('FLASK_STATIC_FOLDER', os.path.join(PROJECT_ROOT, 'static'))

    ADMIN_CATEGORY_ICON_CLASSES = {
        'Security': 'glyphicon glyphicon-lock',
        'Mail': 'glyphicon glyphicon-envelope',
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
    MAIL_ADMINS = ['admin@example.com']  # FIXME
    MAIL_DEFAULT_SENDER = (
        os.environ.get('FLASK_MAIL_DEFAULT_SENDER_NAME', 'Flask Unchained React SPA'),
        os.environ.get('FLASK_MAIL_DEFAULT_SENDER_EMAIL',
                       f"noreply@{os.environ.get('FLASK_DOMAIN', 'localhost')}")
    )

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
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=60)

    ##########################################################################
    # security                                                               #
    ##########################################################################
    SECURITY_PASSWORD_SALT = 'security-password-salt'
    SECURITY_CONFIRMABLE = True
    SECURITY_REGISTERABLE = True
    SECURITY_RECOVERABLE = True
    SECURITY_CHANGEABLE = True

    ADMIN_LOGIN_ENDPOINT = 'admin.login'
    ADMIN_LOGOUT_ENDPOINT = 'admin.logout'
    SECURITY_POST_LOGIN_REDIRECT_ENDPOINT = 'admin.index'
    ADMIN_POST_LOGOUT_ENDPOINT = LocalProxy(
        lambda: url_for('frontend.index', _external=True))

    SECURITY_FORGOT_PASSWORD_ENDPOINT = 'frontend.forgot_password'
    SECURITY_API_RESET_PASSWORD_HTTP_GET_REDIRECT = 'frontend.reset_password'
    SECURITY_INVALID_RESET_TOKEN_REDIRECT = LocalProxy(
        lambda: url_for('frontend.forgot_password', _external=True) + '?invalid')
    SECURITY_EXPIRED_RESET_TOKEN_REDIRECT = LocalProxy(
        lambda: url_for('frontend.forgot_password', _external=True) + '?expired')
    SECURITY_POST_CONFIRM_REDIRECT_ENDPOINT = LocalProxy(
        lambda: url_for('frontend.index', _external=True) + '?welcome')
    SECURITY_CONFIRM_ERROR_REDIRECT_ENDPOINT = LocalProxy(
        lambda: url_for('frontend.resend_confirmation_email', _external=True))

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


class DevConfig(Config):
    DEBUG = get_boolean_env('FLASK_DEBUG', True)
    # EXPLAIN_TEMPLATE_LOADING = True
    # SQLALCHEMY_ECHO = True

    SERVER_NAME = '{host}:5000'.format(host=os.getenv('API_HOST', 'localhost'))
    EXTERNAL_SERVER_NAME = 'http://localhost:8888'
    SESSION_COOKIE_SECURE = False

    ##########################################################################
    # mail                                                                   #
    ##########################################################################
    MAIL_PORT = 1025  # MailHog
    MAIL_DEFAULT_SENDER = ('Flask Unchained React SPA', 'noreply@localhost')  # FIXME

    ##########################################################################
    # security                                                               #
    ##########################################################################
    SECURITY_CONFIRM_EMAIL_WITHIN = '1 minutes'  # for easier manual testing


class ProdConfig(Config):
    pass


class StagingConfig(ProdConfig):
    pass


class TestConfig(Config):
    TESTING = True

    PRESERVE_CONTEXT_ON_EXCEPTION = False
    # SQLALCHEMY_DATABASE_URI = 'sqlite://'  # :memory:
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}'.format(
        user=os.environ.get('FLASK_DATABASE_USER', 'flask_api'),
        password=os.environ.get('FLASK_DATABASE_PASSWORD', 'flask_api'),
        host=os.environ.get('FLASK_DATABASE_HOST', '127.0.0.1'),
        port=os.environ.get('FLASK_DATABASE_PORT', 5432),
        db_name='unit_test',
    )
