#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from collections.abc import Iterable

# Pip package imports

import geoalchemy2
from marshmallow import pre_load, post_load, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.api import WrappedSerializer, ModelSerializer, fields, validates, ValidationError, GeometryModelConverter, GeometryField

from ..models import Field

FIELD_FIELDS = (
    'name', 'field',
)


class FieldSerializer(ModelSerializer):

    #shape = fields.Pluck('FieldDataSerializer', 'shape')
    #value = fields.Pluck('FieldDataSerializer', 'value', missing=True, allow_none=True)
    field = fields.Nested('FieldDataSerializer', many=False, required=True)
    #value = fields.Nested('FieldDataSerializer', only=('value',), many=False)


    class Meta:
        model = Field
        fields = FIELD_FIELDS
        dump_only = ('id', )

@api.serializer(many=True)
class FieldListSerializer(FieldSerializer):

    class Meta:
        model = Field
        fields = FIELD_FIELDS


