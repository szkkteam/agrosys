#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import AgriculturalProduct

DATA_FIELDS = (
    'id',
    'title',
    'so_id',
    'so_unit',
)

class AgriculturalProductSerializer(ModelSerializer):

    regions = fields.Nested('AgriculturalProductRegionListSerializer', many=True)

    class Meta:
        model = AgriculturalProduct
        fields = DATA_FIELDS
        dump_only = ('id', 'regions', )
        #load_instance = False


@api.serializer(many=True)
class AgriculturalProductListSerializer(AgriculturalProductSerializer):

    class Meta:
        model = AgriculturalProduct
        fields = DATA_FIELDS
        dump_only = ('id', 'regions', )
        #load_instance = False