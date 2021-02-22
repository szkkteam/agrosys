#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import Country

DATA_FIELDS = (
    'id',
    'title',
    'iso2',
    'iso3',
)

class CountrySerializer(ModelSerializer):

    class Meta:
        model = Country
        fields = DATA_FIELDS
        #load_instance = False


@api.serializer(many=True)
class CountryListSerializer(CountrySerializer):

    class Meta:
        model = Country
        fields = DATA_FIELDS
        #load_instance = False