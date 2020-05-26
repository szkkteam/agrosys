#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import fields, pre_load, post_dump, ValidationError

import geoalchemy2
from geoalchemy2.shape import from_shape, to_shape
import marshmallow_sqlalchemy as msqla
from shapely import geometry

# Internal package imports
from backend.utils import pluralize

from .model_serializer import ModelSerializer


class WrappedSerializer(ModelSerializer):
    """
    Extends :class:`backend.api.ModelSchema` to automatically wrap serialized
    results with the model name, and automatically unwrap it when loading.

    NOTE: this might not behave as you'd expect if your serializer uses
    nested fields (if a nested object's serializer is also a WrappedSerializer,
    then the nested objects will also end up wrapped, which probably isn't
    what you want...)

    Example usage::

        class Foo(PrimaryKeyMixin, BaseModel):
            name = Column(String)

        class FooSerializer(WrappedSerializer):
            class Meta:
                model = Foo

        foo_serializer = FooSerializer()
        foo = Foo(id=1, name='FooBar')
        foo_json = foo_serializer.dump(foo).data
        # results in:
        foo_json == {
           "foo": {  # <- added by self.wrap_with_envelope on @post_dump
              "id": 1,
              "name": "FooBar"
           }
        }

        # and on deserialization, self.unwrap_envelope loads it correctly:
        foo = foo_serializer.load(foo_json).data
        isinstance(foo, Foo) == True
    """

    # define this on your serializers to set the envelope name(s),
    # instead of relying on automatic naming based on the model name
    __envelop__ = {
        'single': None,
        'many': None,
    }

    def get_envelope_key(self, many):
        single_key = self.__envelop__.get('single', None)
        many_key = self.__envelop__.get('many', None)
        if not many and single_key:
            return single_key
        elif many and many_key:
            return many_key

        name = self.Meta.model.__name__
        # JS tends to use camelCase, so that's what we use here by default
        key = name[0].lower() + name[1:]
        if many:
            return pluralize(key)
        return key

    @pre_load(pass_many=True)
    def unwrap_envelope(self, data, many):
        return data[self.get_envelope_key(many)]

    @post_dump(pass_many=True)
    def wrap_with_envelope(self, data, many):
        return {self.get_envelope_key(many): data}


class GeometryField(fields.Field):
    """
    Use shapely and geoalchemy2 to serialize / deserialize a point
    Does make a big assumption about the data being spat back out as
    JSON, but what the hey.
    """

    def _serialize(self, value, attr, obj):
        if value is None:
            return None
        return geometry.mapping(to_shape(value))

    def _deserialize(self, value, attr, data):
        if value is None:
            return None
        return from_shape(geometry.shape(value))


msqla.ModelConverter.SQLA_TYPE_MAPPING[geoalchemy2.Geography] = GeometryField
msqla.ModelConverter.SQLA_TYPE_MAPPING[geoalchemy2.Geometry] = GeometryField
msqla.ModelConverter.SQLA_TYPE_MAPPING[geoalchemy2.Raster] = fields.Raw
msqla.ModelConverter.SQLA_TYPE_MAPPING[geoalchemy2.RasterElement] = fields.Raw

class GeoJSONSerializer(ModelSerializer):
    """
    Base class for wrappping and unwrapping GeoJSON objects.
    Reading from https://marshmallow.readthedocs.io/en/3.0/extending.html it
    should be possible to wrap and unwrap envelopes around the GeoJSON data
    as it comes in and out of the system.
    https://gist.github.com/om-henners/97bc3a4c0b589b5184ba621fd22ca42e
    """

    # define this on your serializers to set the envelope name(s),
    # instead of relying on automatic naming based on the model name
    __envelop__ = {
        'single': None,
        'many': None,
    }


    __geometry_field_name__ = 'geom'  # or geom, or shape, or ....

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
        return flat

    @pre_load(pass_many=True)
    def unwrap_envelope(self, data, many):
        if 'type' not in data:
            raise ValidationError('GeoJSON type could not be found')
        if many and data['type'] != 'FeatureCollection':
            raise ValidationError('Expecting a FeatureCollection object')

        if not many:
            return self.unwrap_feature(data)

        return [self.unwrap_feature(feature) for feature in data['features']]

    def wrap_feature(self, data):
        """
        Wrap the individual feature as a GeoJSON feature object
        """
        feature = {
            'type': 'Feature',
            'geometry': data.pop(self.__geometry_field_name__)
        }
        feature['properties'] = data
        return feature

    @post_dump(pass_many=True)
    def wrap_with_envelope(self, data, many):
        if not many:
            return self.wrap_feature(data)

        return {
            'type': 'FeatureCollection',
            'features': [self.wrap_feature(feature) for feature in data]
        }