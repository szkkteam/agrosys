#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from ..models import FarmersBlock
from .reference_parcel_base import ReferenceParcelBaseSerializer, REFERENCE_PARCEL_BASE_DATA_FIELDS

#@api.serializer
class FarmersBlockSerializer(ReferenceParcelBaseSerializer):

    class Meta:
        model = FarmersBlock
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        #load_instance = False
