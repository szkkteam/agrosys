#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import SpecificProduct

DATA_FIELDS = (
    'id',
    'title',
    'description',
    'base_yield',
    'unit',
    'properties',
)

class SpecificProductSerializer(ModelSerializer):

    unit = fields.Nested('UnitSerializer', many=False)
    properties = fields.Raw()

    class Meta:
        model = SpecificProduct
        fields = DATA_FIELDS
        dump_only = ('id', 'unit',)
        #load_instance = False

@api.serializer(many=True)
class SpecificProductListSerializer(SpecificProductSerializer):

    class Meta:
        model = SpecificProduct
        fields = DATA_FIELDS
        dump_only = ('id', 'unit',)
        #load_instance = False