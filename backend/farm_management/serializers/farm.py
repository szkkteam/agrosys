#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields as m_fields

from ..models import Farm

FARM_FIELDS = (
    'id',
    'name',
    'role',
)

class FarmSerializer(ModelSerializer):

    #fields = m_fields.Nested('FieldListSerializer', many=True)
    seasons = m_fields.Nested('SeasonListSerializer', only=('id', 'year'), many=True) # Maybe include more? Just for GET
    role = m_fields.Nested('UserFarmSerializer', many=False)

    class Meta:
        model = Farm
        #fields = FARM_FIELDS + ('fields',)
        fields = FARM_FIELDS + ('seasons',)
        dump_only = ('role',)

@api.serializer(many=True)
class FarmListSerializer(ModelSerializer):

    seasons = m_fields.Nested('SeasonListSerializer', only=('id', 'year'), many=True)

    class Meta:
        model = Farm
        fields = FARM_FIELDS + ('seasons',)
        dump_only = ('role',)
