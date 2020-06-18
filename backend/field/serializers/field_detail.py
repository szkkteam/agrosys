#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from collections.abc import Iterable

# Pip package imports

import geoalchemy2
from marshmallow import pre_load, post_dump, post_load, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.database import db
from backend.api import WrappedSerializer, ModelSerializer, fields, validates, ValidationError, GeometryModelConverter, GeometryField

from ..models import FieldDetail
from ..models import SoilType

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
        include_fk = True
        fields = FIELD_DATA_FIELDS + ('soil_type_id', 'soil_type', )
        model_converter = GeometryModelConverter
        dump_only = ('id', 'created_at', 'soil_type')
        load_only = ('soil_type_id', )

    @validates('soil_type_id')
    def validate_id(self, soil_type_id):
        inst = db.session.query(SoilType).get(soil_type_id)
        if not inst:
            raise ValidationError('Not a valid ID.', 'soil_type_id')
        return

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

    def load(self, data, many=None, partial=None, unknown=None):

        def _load_soil_type(result, soil_type_id):
            result.soil_type = SoilType.get(soil_type_id)
            return result

        result = self._do_load(
            data, many=many, partial=partial, unknown=unknown, postprocess=True
        )
        if many:
            result = [_load_soil_type(r, d['soilTypeId']) for d, r in zip(data, result)]
        else:
            result = _load_soil_type(result, data['soilTypeId'])
        return result

@api.serializer(many=True)
class FieldDetailListSerializer(FieldDetailSerializer):

    class Meta:
        model = FieldDetail
        fields = FIELD_DATA_FIELDS + ('soil_type_id', 'soil_type', )
        #dump_only = ('name', 'value', 'shape')
        model_converter = GeometryModelConverter
        dump_only = ('id', 'created_at', 'soil_type')
        load_only = ('soil_type_id', )

