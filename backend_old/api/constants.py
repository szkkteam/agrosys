#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import re

# Pip package imports
# Internal package imports


CREATE = 'create'
DELETE = 'delete'
GET = 'get'
HEAD = 'head'
LIST = 'list'
PATCH = 'patch'
PUT = 'put'

ALL_METHODS = (CREATE, DELETE, GET, LIST, PATCH, PUT)

__param_name_re = r'<(\w+:)?(?P<param_name>\w+)>'
PARAM_NAME_RE = re.compile(__param_name_re)
LAST_PARAM_NAME_RE = re.compile(__param_name_re + r'$')

# TODO: Include to the dump_only fields
READ_ONLY_FIELDS = ('slug', 'createdAt', 'updatedAt')
