#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from collections.abc import Iterable

# Pip package imports

import geoalchemy2
from marshmallow import pre_load, post_dump, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.api import WrappedSerializer, ModelSerializer, fields, validates, ValidationError, GeometryModelConverter, GeometryField

from ..models import Field

FIELD_FIELDS = (
    'name',
)


class FieldSerializer(ModelSerializer):

    class Meta:
        model = Field
        fields = FIELD_FIELDS

@api.serializer(many=True)
class FieldListSerializer(FieldSerializer):

    class Meta:
        model = Field
        fields = FIELD_FIELDS
        #dump_only = ('name', 'value', 'shape')


