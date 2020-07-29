#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow_sqlalchemy.convert import ModelConverter as BaseModelConverter
from geoalchemy2.shape import from_shape, to_shape
import marshmallow_sqlalchemy as msqla
from shapely import geometry
import geoalchemy2

# Internal package imports
from backend.api import fields

class GeometryField(fields.Field):
    """
    Use shapely and geoalchemy2 to serialize / deserialize a point
    Does make a big assumption about the data being spat back out as
    JSON, but what the hey.
    """

    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {
            'type': 'Feature',
            # TODO: This is currently empty.
            'properties': {},
            'geometry': geometry.mapping(to_shape(value))
        }


    def _deserialize(self, value, attr, data, **kwargs):
        if value is None:
            return None
        return from_shape(geometry.shape(value['geometry']))

# TODO: Define a money field, where the input is like money = {'amount': 1, 'currency': 'USD'} and convert it to sa.Decimal format
# https://github.com/marshmallow-code/marshmallow/issues/172
# https://pypi.org/project/python-money/
class MoneyField(fields.Field):

    def _deserialize( self, value, attr, data, **kwargs):
        pass



class GeometryModelConverter(BaseModelConverter):
    SQLA_TYPE_MAPPING = {
        **BaseModelConverter.SQLA_TYPE_MAPPING,
        **{geoalchemy2.Geometry: GeometryField},
        **{geoalchemy2.Geography: GeometryField},
        **{geoalchemy2.Raster: fields.Raw},
        **{geoalchemy2.RasterElement: fields.Raw},
    }
