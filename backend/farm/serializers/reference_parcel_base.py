#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, GeometryModelConverter, GeometryField
from backend.api.utils import object_id_exists
from backend.api import fields

from ..models import ReferenceParcel

REFERENCE_PARCEL_BASE_DATA_FIELDS = (
    'id',
    'title',
    'notes',
    'geometry',
    'total_area',
    'ancestor_id',
)

class ReferenceParcelBaseSerializer(ModelSerializer):

    total_area = fields.Decimal(as_string=True, required=True)

    geometry = GeometryField(load_from='geometry')

    ancestor_id = fields.Integer(required=False, default=None, validate=lambda x: object_id_exists(x, ReferenceParcel, id='parcel_id'))

    class Meta:
        model = ReferenceParcel
        model_converter = GeometryModelConverter
        #fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        #dump_only = ('id',)

    @validates('total_area')
    def validate_total_area(self, total_area, *args, **kwargs):
        print("validate_total_area, total_area: ", total_area)
        print("validate_total_area, args: ", args)
        print("validate_total_area, kwargs: ", kwargs)
        partial = kwargs.get('partial', False)
        if not partial:
            if total_area <= 0:
                raise ValidationError("Field may not be 0 or less.")

