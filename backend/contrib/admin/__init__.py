#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.magic import Bundle

from .macro import macro
from .model_admin import ModelAdmin
from .file_admin import FileAdmin


admin_bundle = Bundle(__name__)
