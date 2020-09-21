#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from ..models import CadastralParcel
from .reference_parcel_base import ReferenceParcelBaseSerializer, REFERENCE_PARCEL_BASE_DATA_FIELDS

#@api.serializer
class CadastralParcelSerializer(ReferenceParcelBaseSerializer):

    class Meta:
        model = CadastralParcel
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS + ('season',)
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels', 'season', )
        load_only = ('agricultural_type_id', 'soil_type_id', 'ancestor_id', 'parcels_add',)


@api.serializer(many=True)
class CadastralParcelListSerializer(ReferenceParcelBaseSerializer):

    #base_parcels = fields.Nested('BaseParcelListSerializer', many=True, data_key='parcels')
    #soil_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SoilType))

    class Meta:
        model = CadastralParcel
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels', 'season', )
        load_only = ('agricultural_type_id', 'soil_type_id', 'ancestor_id', 'parcels_add',)