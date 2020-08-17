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
    'title',
    'role',
)

FARM_PERMISSION_FIELDS = (
    'is_owner', 'permissions'
)


class FarmSerializer(ModelSerializer):

    fields = m_fields.Nested('FieldListSerializer', many=True)
    role = m_fields.Nested('FarmPermissionSerializer', many=False)

    class Meta:
        model = Farm
        #fields = FARM_FIELDS + ('fields',)
        fields = FARM_FIELDS
        dump_only = ('id', 'role',)

@api.serializer(many=True)
class FarmListSerializer(ModelSerializer):

    #seasons = m_fields.Nested('SeasonListSerializer', only=('id', 'year'), many=True)

    class Meta:
        model = Farm
        fields = FARM_FIELDS
        dump_only = ('id', 'role', )


class FarmPermissionSerializer(ModelSerializer):

    class Meta:
        model = Farm
        fields = FARM_PERMISSION_FIELDS
        #dump_only = ('owner',)