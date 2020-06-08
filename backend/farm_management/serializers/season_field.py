#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields as m_fields

from ..models import SeasonField

SEASON_FIELD_FIELDS = (

)

class SeasonFieldSerializer(ModelSerializer):

    class Meta:
        model = SeasonField
        fields = SEASON_FIELD_FIELDS
