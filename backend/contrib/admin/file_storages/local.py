#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_admin.contrib.fileadmin import LocalFileStorage as BaseLocalFileStorage
from flask_fs.backends.local import LocalBackend
# Internal package imports

class LocalFileStorage(BaseLocalFileStorage, LocalBackend):


