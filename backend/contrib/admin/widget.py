#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from markupsafe import Markup, escape

from wtforms.widgets import TextInput, html_params

# Internal package imports

class ImagePreviewWidget(object):
    """
        Render a basic ``<div>`` element which will be extended by the js
        """

    html_params = staticmethod(html_params)

    def __init__(self):
        pass

    def __call__(self, field, **kwargs):
        kwargs.setdefault("id", field.id)
        return Markup("<div %s>" % self.html_params(name=field.name, **kwargs))
