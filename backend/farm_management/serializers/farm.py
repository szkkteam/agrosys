#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelSerializer
from backend.api import fields as m_fields

from ..models import Farm

FARM_FIELDS = (
    'name',
)

class FarmSerializer(ModelSerializer):

    #fields = m_fields.Nested()

    class Meta:
        model = Farm
        fields = FARM_FIELDS

