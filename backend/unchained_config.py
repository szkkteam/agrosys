import os

# kwargs to pass to the Flask constructor (must be uppercase, all optional)
ROOT_PATH = os.path.dirname(__file__)  # determined automatically by default
STATIC_FOLDER = "static"               # determined automatically by default
STATIC_URL_PATH = "/static"            # determined automatically by default
STATIC_HOST = None                     # None by default
TEMPLATE_FOLDER = "templates"          # determined automatically by default
HOST_MATCHING = False                  # False by default
SUBDOMAIN_MATCHING = False             # False by default

BUNDLES = [
    'flask_unchained.bundles.controller',
    'flask_unchained.bundles.admin',
    'flask_unchained.bundles.api',
    'flask_unchained.bundles.graphene',
    'flask_unchained.bundles.mail',
    'flask_unchained.bundles.celery',  # must be after mail bundle to send async email
    'flask_unchained.bundles.session',
    'flask_unchained.bundles.sqlalchemy',
    'py_yaml_fixtures',

    #'bundles.blog',
    'bundles.security',
    'backend',  # app bundle must be last
]
