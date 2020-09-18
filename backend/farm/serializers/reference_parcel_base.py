#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from collections.abc import Iterable

# Pip package imports
import geoalchemy2
from marshmallow import pre_load, post_dump, post_load, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, GeometryModelConverter, GeometryField
from backend.api import fields
from backend.reference.models import SoilType, AgriculturalType

from ..models import ReferenceParcel

REFERENCE_PARCEL_BASE_DATA_FIELDS = (
    'id',
    'title',
    'notes',
    'geometry',
    'total_area',
    'eligible_area',
    'agricultural_type',
    'agricultural_type_id',
    'soil_type',
    'soil_type_id',
    'parcels',
    'parcels_add',
    'ancestor_id',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

def parcel_id_exists(object_id, model):
    if not model.get_by(parcel_id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class ReferenceParcelBaseSerializer(ModelSerializer):

    #shape = fields.Pluck('FieldDataSerializer', 'shape')
    #value = fields.Pluck('FieldDataSerializer', 'value', missing=True, allow_none=True)
    #field = fields.Nested('FieldDataSerializer', many=False, required=True)
    #value = fields.Nested('FieldDataSerializer', only=('value',), many=False)

    total_area = fields.Decimal(as_string=True, required=True)
    eligible_area = fields.Decimal(as_string=True, required=True)

    geometry = GeometryField(load_from='geometry')

    soil_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SoilType))
    soil_type = fields.Nested('SoilTypeSerializer', many=False)

    agricultural_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, AgriculturalType))
    agricultural_type = fields.Nested('AgriculturalTypeSerializer', many=False)

    parcels = fields.Nested('ReferenceParcelListSerializer', many=True, exclude=('parcels',), dump_only=True)
    parcels_add = fields.Nested('ReferenceParcelListSerializer', many=True, exclude=('parcels',), load_only=True, data_key='parcels')

    ancestor_id = fields.Integer(required=False, default=None, validate=lambda x: parcel_id_exists(x, ReferenceParcel))

    class Meta:
        model = ReferenceParcel
        model_converter = GeometryModelConverter
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels',)
        load_only = ('agricultural_type_id', 'soil_type_id', 'ancestor_id', 'parcels_add',)

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
class ReferenceParcelBaseListSerializer(ReferenceParcelBaseSerializer):

    #base_parcels = fields.Nested('BaseParcelListSerializer', many=True, data_key='parcels')
    #soil_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SoilType))

    class Meta:
        model = ReferenceParcel
        model_converter = GeometryModelConverter
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        dump_only = ('id', 'agricultural_type', 'soil_type', 'parcels',)
        load_only = ('agricultural_type_id', 'soil_type_id', 'ancestor_id', 'parcels_add',)

