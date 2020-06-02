#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer
from backend.api import fields as m_fields

from ..models import UserFarm

USER_FARM_FIELDS = (
    'is_owner',
)

class UserFarmSerializer(ModelSerializer):

    class Meta:
        model = UserFarm
        fields = USER_FARM_FIELDS
        dump_only = ('owner',)
