#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields

from ..models import Season

DATA_FIELDS = (
    'id',
    'title',
    'reference_parcels',
)

class SeasonSerializer(ModelSerializer):

    reference_parcels = fields.Nested('ReferenceParcelSerializer', many=True, required=False, exclude=('season', ))

    class Meta:
        model = Season
        #fields = FARM_FIELDS + ('fields',)
        fields = DATA_FIELDS
        dump_only = ('id', )

@api.serializer(many=True)
class SeasonListSerializer(ModelSerializer):

    class Meta:
        model = Season
        fields = DATA_FIELDS
        dump_only = ('id', )

