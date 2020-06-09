#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields as m_fields

from ..models import Season

SEASON_FIELDS = (
    'id',
    'year',
)

class SeasonSerializer(ModelSerializer):

    # TODO: Implement a "copy_fields_from" function field, which is 'load_only' and returns with the fields from a different season.

    class Meta:
        model = Season
        fields = SEASON_FIELDS
        dump_only = ('id',)

@api.serializer(many=True)
class SeasonListSerializer(ModelSerializer):

    #url = m_fields.Url(relative=False)

    class Meta:
        model = Season
        fields = SEASON_FIELDS
        dump_only = ('id',)
