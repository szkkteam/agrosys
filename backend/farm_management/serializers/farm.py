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

    fields = m_fields.Nested('FieldListSerializer', many=True)
    role = m_fields.Nested('UserFarmSerializer', many=False)

    class Meta:
        model = Farm
        fields = FARM_FIELDS + ('fields',)
        dump_only = ('role',)

@api.serializer(many=True)
class FarmListSerializer(ModelSerializer):

    #url = m_fields.Url(relative=False)

    class Meta:
        model = Farm
        fields = FARM_FIELDS
        dump_only = ('role',)
