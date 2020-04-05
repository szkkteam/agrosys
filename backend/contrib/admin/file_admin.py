#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_admin.contrib.fileadmin import BaseFileAdmin, LocalFileStorage

# Internal package imports

class FileAdmin(BaseFileAdmin):

    menu_icon_value = 'glyphicon-folder-open'

    def __init__(self, storage=None, base_path='', *args, **kwargs):
        _storage = storage if storage is not None else LocalFileStorage(base_path)
        super(FileAdmin, self).__init__(storage=_storage, *args, **kwargs )