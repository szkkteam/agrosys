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

from ..models import BaseParcel
from backend.reference.models import SoilType

DATA_FIELDS = (
    'id',
    'title',
    'geometry',
    'area',
)


class BaseParcelSerializer(ModelSerializer):
    #name = fields.String(required=True)
    geometry = GeometryField(load_from='geometry')
    area = fields.Decimal(as_string=True, required=True)

    class Meta:
        model = BaseParcel
        fields = DATA_FIELDS
        model_converter = GeometryModelConverter
        dump_only = ('id', )

    @validates_schema
    def validate_area(self, data, **kwargs):
        errors = {}
        if data['area'] <= 0:
            errors["area"] = ["Field may not be 0 or less."]
        if errors:
            raise ValidationError(errors)


@api.serializer(many=True)
class BaseParcelListSerializer(BaseParcelSerializer):

    #reference_parcel = fields.Nested('ReferenceParcelSerializer', only=('id', 'title'), dump_only=True, required=False, many=False)

    class Meta:
        model = BaseParcel
        fields = DATA_FIELDS #+ ('reference_parcel', )
        #dump_only = ('name', 'value', 'shape')
        model_converter = GeometryModelConverter
        dump_only = ('id', )
