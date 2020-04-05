#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_mail import Mail as BaseMail

# Internal package imports

class Mail(BaseMail):
    def init_app(self, app):
        self.state = super().init_app(app)


mail = Mail()
