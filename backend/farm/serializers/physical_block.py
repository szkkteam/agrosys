#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.api.utils import object_id_exists
from backend.api import fields, ValidationError, validates
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

    parcels = fields.Nested('ReferenceParcelSerializer', many=True, dump_only=True) # exclude=('parcels', 'season',)
    parcels_add = fields.Nested('ReferenceParcelSerializer', many=True, load_only=True, data_key='parcels') # exclude=('parcels', 'season',)

    season = fields.Nested('SeasonSerializer', many=False, exclude=('parcels',), dump_only=True)


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
            if errors:
                raise ValidationError(errors)
        else:
            if 'eligible_area' in data or 'total_area' in data:
                # TODO: How to validate these dependent fields?
                pass


    @validates('eligible_area')
    def validate_eligible_area(self, eligible_area, *args, **kwargs):
        print("eligible_area, eligible_area: ", eligible_area)
        print("eligible_area, args: ", args)
        print("eligible_area, kwargs: ", kwargs)
        partial = kwargs.get('partial', False)
        if not partial:
            if eligible_area <= 0:
                raise ValidationError("Field may not be 0 or less.")




@api.serializer(many=True)
class PhysicalBlockListSerializer(ReferenceParcelBaseSerializer):

    class Meta:
        model = PhysicalBlock
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS + PHYSICAL_BLOCK_DATA_FIELDS
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels', 'season', )
        load_only = ('agricultural_type_id', 'soil_type_id', 'parcels_add',)