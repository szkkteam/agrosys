#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import Field

FIELD_PERMISSION_FIELDS = (
    'is_owner', 'permissions'
)

class FieldPermissionSerializer(ModelSerializer):

    class Meta:
        model = Field
        fields = FIELD_PERMISSION_FIELDS
        dump_only = ('owner', 'permissions')
