#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports

import geoalchemy2
from marshmallow import pre_load, post_dump

# Internal package imports
from backend.extensions.api import api
from backend.api import WrappedSerializer, fields, validates, ValidationError, GeometryModelConverter

from ..models import Field

FIELD_FIELDS = (
    'name',
    'value',
    'shape'
)

class FieldSerializer(WrappedSerializer):
    #name = fields.String(required=True)
    #value = fields.Float(missing=True, allow_none=True)

    class Meta:
        model = Field
        fields = FIELD_FIELDS
        model_converter = GeometryModelConverter

    __geometry_field_name__ = 'shape'  # or geom, or shape, or ....

    def unwrap_feature(self, data):
        """
        Unwrap an individual feature object
        Pull down all the properties field, and then under the geometry
        field name put in the actual geometry data
        """
        if data['type'] != 'Feature':
            raise ValidationError('Expecting a Feature object')
        flat = data['properties']
        flat[self.__geometry_field_name__] = data['geometry']
        # TODO: Dirty testing
        return data['geometry']

    @pre_load(pass_many=True)
    def unwrap_envelope(self, data, many, **kwargs):
        shape = data[self.__geometry_field_name__]

        if 'type' not in shape:
            raise ValidationError('GeoJSON type could not be found')
        if many and shape['type'] != 'FeatureCollection':
            raise ValidationError('Expecting a FeatureCollection object')

        if not many:
            data[self.__geometry_field_name__] = self.unwrap_feature(shape)
            print("Unwrap: ", data)
            return data

        raise NotImplementedError("Feature collection is not implemented yet.")
        return [self.unwrap_feature(feature) for feature in data['features']]

    def wrap_feature(self, data):
        """
        Wrap the individual feature as a GeoJSON feature object
        """
        feature = {
            'type': 'Feature',
            # TODO: This is currently empty.
            'properties': {},
            'geometry': data.pop(self.__geometry_field_name__)
        }
        print("Wrap: ", feature)
        return feature

    @post_dump(pass_many=True)
    def wrap_with_envelope(self, data, many, **kwargs):
        if not many:
            data[self.__geometry_field_name__] = self.wrap_feature(data)
            print("Data from wrap_with_envelope: ", data)
            return data

        raise NotImplementedError("Feature collection is not implemented yet.")
        return {'shape': {
            'type': 'FeatureCollection',
            'features': [self.wrap_feature(feature) for feature in data]
        }}

@api.serializer(many=True)
class FieldListSerializer(FieldSerializer):

    class Meta:
        model = Field
        exclude = ('created_at', 'updated_at')
        #dump_only = ('name', 'value', 'shape')
        model_converter = GeometryModelConverter

    __geometry_field_name__ = 'shape'  # or geom, or shape, or ....
