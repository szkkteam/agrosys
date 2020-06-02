#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import re
import unicodedata

# Pip package imports
from flask_sqlalchemy.model import camel_to_snake_case
from flask import current_app
from itsdangerous import URLSafeSerializer, BadData
from loguru import logger

# Internal package imports
from .decorators import was_decorated_without_parenthesis, wrap_decorator
#from .mail import send_mail, prepare_mail, send_mail_sync

def slugify(string):
    string = re.sub(r'[^\w\s-]', '',
                    unicodedata.normalize('NFKD', string.strip()))
    return re.sub(r'[-\s]+', '-', string).lower()


def title_case(string):
    return camel_to_snake_case(string).replace('_', ' ').title()


def pluralize(name):
    if name.endswith('y'):
        # right replace 'y' with 'ies'
        return 'ies'.join(name.rsplit('y', 1))
    elif name.endswith('s'):
        return f'{name}es'
    return f'{name}s'


def string_to_bool(s):
    if isinstance(s, str):
        if s.lower() in [ 'true', 'yes', 'y', '1', 'ye', 't' ]:
            return True
        elif s.lower() in [ 'false', 'no', 'n', '0', 'f' ]:
            return False
    return

def listify(obj):
    if not isinstance(obj, (tuple, list)):
        return [obj]
    return obj



def decode_token(token):
    """ Decode the token to retrive the encoded data """
    s = URLSafeSerializer(current_app.secret_key, salt=current_app.config['SECURITY_PASSWORD_SALT'])
    try:
        return s.loads(token)
    except BadData as e:
        logger.error(e)
        return None

def encode_token(data):
    """ Encode a data and return with the encoded token """
    s = URLSafeSerializer(current_app.secret_key, salt=current_app.config['SECURITY_PASSWORD_SALT'])
    return s.dumps(data)
