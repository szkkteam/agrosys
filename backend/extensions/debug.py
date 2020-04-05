#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_debugtoolbar import DebugToolbarExtension as BaseDebugToolbarExtension

# Internal package imports

class DebugToolbarExtension(BaseDebugToolbarExtension):
    def init_app(self, app):
        self.state = super().init_app(app)

toolbar = DebugToolbarExtension()