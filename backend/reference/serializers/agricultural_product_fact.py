#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import AgriculturalProductFact

DATA_FIELDS = (
    'value',
    'specific_product',
    'region',
)

class AgriculturalProductFactSerializer(ModelSerializer):

    specific_product = fields.Nested('SpecificProductSerializer', many=False)
    region = fields.Nested('RegionSerializer', many=False)

    class Meta:
        model = AgriculturalProductFact
        fields = DATA_FIELDS
        dump_only = ('specific_product', 'region')
        #load_instance = False


@api.serializer(many=True)
class AgriculturalProductFactListSerializer(AgriculturalProductFactSerializer):

    class Meta:
        model = AgriculturalProductFact
        fields = DATA_FIELDS
        dump_only = ('specific_product', 'region')
        #load_instance = False