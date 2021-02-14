#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import Unit

UNIT_FIELDS = (
    'id',
    'title',
)


class UnitSerializer(ModelSerializer):

    class Meta:
        model = Unit
        fields = UNIT_FIELDS
        #load_instance = False

@api.serializer(many=True)
class UnitListSerializer(UnitSerializer):

    class Meta:
        model = Unit
        fields = UNIT_FIELDS
        #load_instance = False