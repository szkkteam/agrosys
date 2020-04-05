#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import current_app, url_for
from flask.helpers import get_debug_flag

# Internal package imports

def safe_url_for_external(*args, **kwargs):
    if get_debug_flag():
        base_url = kwargs.pop('_base_url', current_app.config.get('SERVER_NAME', 'localhost:5000'))
        with current_app.app_context(), current_app.test_request_context(base_url=base_url):
            kwargs['_external'] = True
            return url_for(*args, **kwargs)
    else:
        # In production config
        with current_app.app_context(), current_app.test_request_context():
            kwargs['_external'] = True
            return url_for(*args, **kwargs)
