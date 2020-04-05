#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from wtforms import Field, ValidationError, fields

try:
    from wtforms.fields.core import _unset_value as unset_value
except ImportError:
    from wtforms.utils import unset_value

from flask_admin.form import ImageUploadInput
from flask_admin.babel import gettext
from flask_admin._compat import urljoin, string_types
from flask_admin.helpers import get_url

from werkzeug.datastructures import FileStorage

# Internal package imports
from .widget import ImagePreviewWidget

class ImagePreviewField(Field):
    widget = ImagePreviewWidget

    def __init__(self, *args, **kwargs):
        super(ImagePreviewField, self).__init__(*args, **kwargs)