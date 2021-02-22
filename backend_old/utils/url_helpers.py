#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from datetime import datetime
# Pip package imports
from werkzeug.routing import BaseConverter, ValidationError
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

class DateConverter(BaseConverter):
    """Extracts a ISO8601 date from the path and validates it."""

    regex = r'\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        try:
            return datetime.strptime(value, '%Y-%m-%d').date()
        except ValueError:
            raise ValidationError()

    def to_url(self, value):
        return value.strftime('%Y-%m-%d')