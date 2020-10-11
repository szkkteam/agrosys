#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.api.utils import object_id_exists
from backend.api import fields, ValidationError
from backend.reference.models import SoilType, AgriculturalType
from ..models import PhysicalBlock
from .reference_parcel_base import ReferenceParcelBaseSerializer, REFERENCE_PARCEL_BASE_DATA_FIELDS


PHYSICAL_BLOCK_DATA_FIELDS = (
    'eligible_area',
    'agricultural_type',
    'agricultural_type_id',
    'soil_type',
    'soil_type_id',
    'parcels',
    'parcels_add',
    'season',
)

#@api.serializer
class PhysicalBlockSerializer(ReferenceParcelBaseSerializer):

    eligible_area = fields.Decimal(as_string=True, required=True)

    soil_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SoilType))
    soil_type = fields.Nested('SoilTypeSerializer', many=False)

    agricultural_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, AgriculturalType))
    agricultural_type = fields.Nested('AgriculturalTypeSerializer', many=False)

    parcels = fields.Nested('ReferenceParcelSerializer', many=True, exclude=('parcels', 'season',), dump_only=True)
    parcels_add = fields.Nested('ReferenceParcelSerializer', many=True, exclude=('parcels', 'season',), load_only=True, data_key='parcels')

    season = fields.Nested('SeasonSerializer', many=False, only=('id', 'title'), dump_only=True)


    class Meta:
        model = PhysicalBlock
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS + PHYSICAL_BLOCK_DATA_FIELDS
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels', 'season', )
        load_only = ('agricultural_type_id', 'soil_type_id', 'parcels_add',)


    @validates_schema
    def validate_area(self, data, **kwargs):
        partial = kwargs.get('partial', False)
        errors = {}
        if not partial:
            if data['eligible_area'] > data['total_area']:
                errors["eligibleArea"] = ["Field may be not bigger than totalArea."]
            if data['eligible_area'] <= 0:
                errors["eligibleArea"] = ["Field may not be 0 or less."]
            if data['total_area'] <= 0:
                errors["totalArea"] = ["Field may not be 0 or less."]
            if errors:
                raise ValidationError(errors)
        else:
            if 'eligible_area' in data or 'total_area' in data:
                # TODO: How to validate these dependent fields?
                pass


@api.serializer(many=True)
class PhysicalBlockListSerializer(ReferenceParcelBaseSerializer):

    class Meta:
        model = PhysicalBlock
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS + PHYSICAL_BLOCK_DATA_FIELDS
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels', 'season', )
        load_only = ('agricultural_type_id', 'soil_type_id', 'parcels_add',)