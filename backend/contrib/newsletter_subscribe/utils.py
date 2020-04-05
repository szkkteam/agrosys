#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import current_app, url_for
from itsdangerous import URLSafeSerializer, BadData

# Internal package imports
from backend.utils import encode_token, decode_token

def generate_resubscribe_link(email):
    token = encode_token(email)
    return url_for('newsletter_subscribe.resubscribe', token=token)

def generate_unsubscribe_link(email):
    token = encode_token(email)
    return url_for('newsletter_subscribe.unsubscribe', token=token)