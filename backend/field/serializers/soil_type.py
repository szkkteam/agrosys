#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import SoilType

SOIL_TYPE_FIELDS = (
    'id',
    'title',
)

class SoilTypeSerializer(ModelSerializer):

    class Meta:
        model = SoilType
        fields = SOIL_TYPE_FIELDS
        dump_only = ('id', 'title')
        load_only = ('id', )
        #load_instance = False
