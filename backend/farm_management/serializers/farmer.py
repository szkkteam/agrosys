#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelSerializer

from ..models import Farmer

FARMER_FIELDS = ('is_owner',)

class FarmerSerializer(ModelSerializer):
    class Meta:
        model = Farmer
        fields = FARMER_FIELDS

