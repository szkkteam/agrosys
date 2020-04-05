#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from http import HTTPStatus

# Pip package imports
from flask import abort, redirect, request, url_for
from flask_login import current_user as user

# Internal package imports

class AdminSecurityMixin(object):
    def is_accessible(self):
        if user.is_active and user.is_authenticated and user.has_role('ROLE_ADMIN'):
            return True
        return False

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            if not user.is_authenticated:
                return redirect(url_for('security.login', next=request.url))
            abort(HTTPStatus.FORBIDDEN)
