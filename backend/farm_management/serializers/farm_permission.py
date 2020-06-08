#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields as m_fields

from ..models import Farm

FARM_PERMISSION_FIELDS = (
    'is_owner', 'permissions'
)

class FarmPermissionSerializer(ModelSerializer):

    class Meta:
        model = Farm
        fields = FARM_PERMISSION_FIELDS
        #dump_only = ('owner',)
