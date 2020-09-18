#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from ..models import CadastralParcel
from .reference_parcel_base import ReferenceParcelBaseSerializer, REFERENCE_PARCEL_BASE_DATA_FIELDS

#@api.serializer
class CadastralParcelSerializer(ReferenceParcelBaseSerializer):

    class Meta:
        model = CadastralParcel
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        #load_instance = False
