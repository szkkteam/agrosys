#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    TimestampMixin, BaseModel

)
from backend.permissions.models import ResourceMixin

class Resource(ResourceMixin, TimestampMixin, BaseModel):

    __possible_permissions__ = ('edit', 'view', 'delete', 'create')

    # TODO: Implement later
    # example implementation of ACLS for pyramid application
    