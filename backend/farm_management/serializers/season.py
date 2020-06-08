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

    class Meta:
        model = Season
        fields = SEASON_FIELDS

@api.serializer(many=True)
class SeasonListSerializer(ModelSerializer):

    #url = m_fields.Url(relative=False)

    class Meta:
        model = Season
        fields = SEASON_FIELDS
