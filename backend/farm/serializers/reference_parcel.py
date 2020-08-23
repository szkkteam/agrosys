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
from backend.reference.models import SoilType, ReferenceParcelType

from ..models import ReferenceParcel

DATA_FIELDS = (
    'id',
    'title',
    'notes',
    'geometry',
    'total_area',
    'eligible_area',
    'reference_parcel_type',
    'reference_parcel_type_id',
    'soil_type',
    'soil_type_id',
    'parcels',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class ReferenceParcelSerializer(ModelSerializer):

    #shape = fields.Pluck('FieldDataSerializer', 'shape')
    #value = fields.Pluck('FieldDataSerializer', 'value', missing=True, allow_none=True)
    #field = fields.Nested('FieldDataSerializer', many=False, required=True)
    #value = fields.Nested('FieldDataSerializer', only=('value',), many=False)

    total_area = fields.Decimal(as_string=True, required=True)
    eligible_area = fields.Decimal(as_string=True, required=True)

    geometry = GeometryField(load_from='geometry')

    soil_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SoilType))
    soil_type = fields.Nested('SoilTypeSerializer', many=False)

    reference_parcel_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, ReferenceParcelType))
    reference_parcel_type = fields.Nested('ReferenceParcelTypeSerializer', many=False)    

    parcels = fields.Nested('ReferenceParcelListSerializer', many=True, exclude=('parcels',))

    class Meta:
        model = ReferenceParcel
        model_converter = GeometryModelConverter
        fields = DATA_FIELDS
        dump_only = ('id', 'reference_parcel_type', 'soil_type',)
        load_only = ('reference_parcel_type_id', 'soil_type_id',)

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
class ReferenceParcelListSerializer(ReferenceParcelSerializer):

    #base_parcels = fields.Nested('BaseParcelListSerializer', many=True, data_key='parcels')
    #soil_type_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SoilType))

    class Meta:
        model = ReferenceParcel
        model_converter = GeometryModelConverter
        fields = DATA_FIELDS
        dump_only = ('id', 'reference_parcel_type', 'soil_type',)
        load_only = ('reference_parcel_type_id', 'soil_type_id',)

