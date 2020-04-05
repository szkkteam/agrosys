#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import jsonify
from flask_login import current_user

# Internal package imports
from backend.extensions.api import api

from .blueprint import security
from ..decorators import auth_required


# FIXME implement remember me functionality
@api.route(security, '/check-auth-token')
@auth_required
def check_auth_token():
    return jsonify({'user': current_user._get_current_object()})
