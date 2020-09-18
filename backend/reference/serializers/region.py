#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import Region

DATA_FIELDS = (
    'id',
    'title',
    'so_code',
)

class RegionSerializer(ModelSerializer):

    country = fields.Nested('CountrySerializer', many=False)

    class Meta:
        model = Region
        fields = DATA_FIELDS
        dump_only = ('id', 'country', )
        #load_instance = False


@api.serializer(many=True)
class RegionListSerializer(RegionSerializer):

    class Meta:
        model = Region
        fields = DATA_FIELDS
        dump_only = ('id', 'country',)
        #load_instance = False