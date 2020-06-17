#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from collections.abc import Iterable

# Pip package imports

import geoalchemy2
from marshmallow import pre_load, post_dump, post_load, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.api import WrappedSerializer, ModelSerializer, fields, validates, ValidationError, GeometryModelConverter, GeometryField

from ..models import FieldDetail

FIELD_DATA_FIELDS = (
    'id',
    'value',
    'shape',
    'area',
    'created_at',
)


class FieldDetailSerializer(ModelSerializer):
    #name = fields.String(required=True)
    value = fields.Float(missing=True, allow_none=True)
    area = fields.Float()
    shape = GeometryField(load_from='shape')
    soil_type = fields.Nested('SoilTypeSerializer', many=False, data_key='soil')

    class Meta:
        model = FieldDetail
        fields = FIELD_DATA_FIELDS + ('soil_type', )
        model_converter = GeometryModelConverter
        dump_only = ('id', 'created_at', )


    def _validate_geojson(self, data, **kwargs):
        shape = data.get('shape')
        if shape:
            if 'type' not in shape:
                raise ValidationError('GeoJSON type could not be found.', 'shape')
            if shape['type'] != 'Feature':
                raise ValidationError('Expecting a Feature object', 'shape')
            if 'geometry' not in shape:
                raise ValidationError('Expecting a geometry field', 'shape')

    # TODO: Check why validation happen after deserialization. That does not make sense
    @pre_load(pass_many=True)
    def validate_geojson(self, data, **kwargs):
        if isinstance(data, tuple):
            loc_data = data[0]
        else:
            loc_data = data
        if isinstance(loc_data, list):
            for d in loc_data:
                self._validate_geojson(d)
        else:
            self._validate_geojson(loc_data)
        return loc_data

@api.serializer(many=True)
class FieldDetailListSerializer(FieldDetailSerializer):

    class Meta:
        model = FieldDetail
        fields = FIELD_DATA_FIELDS + ('soil_type', )
        #dump_only = ('name', 'value', 'shape')
        model_converter = GeometryModelConverter
        dump_only = ('id', 'created_at',)

