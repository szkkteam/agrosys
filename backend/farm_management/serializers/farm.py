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
)

class FarmSerializer(ModelSerializer):

    fields = m_fields.Nested('FieldListSerializer', many=True)
    #is_owner = m_fields.Nested('FarmerSerializer', only=('is_owner',))
    owner = m_fields.Boolean()

    class Meta:
        model = Farm
        fields = FARM_FIELDS + ('fields',)
        dump_only = ('owner',)

@api.serializer(many=True)
class FarmListSerializer(ModelSerializer):

    #is_owner = m_fields.Nested('FarmerSerializer', only=('is_owner',))
    owner = m_fields.Boolean()
    url = m_fields.Url(relative=False)

    class Meta:
        model = Farm
        fields = FARM_FIELDS
        dump_only = ('owner','url')