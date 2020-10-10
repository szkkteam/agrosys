#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError

# Internal package imports
from backend.extensions.api import api
from backend.api import OneOfSchema, validates, ValidationError, GeometryModelConverter, GeometryField

from ..models import ReferenceParcel, ReferenceParcelTypes
from .reference_parcel_base import REFERENCE_PARCEL_BASE_DATA_FIELDS
from .agricultural_parcel import AgriculturalParcelSerializer
from .physical_block import PhysicalBlockSerializer




class ReferenceParcelSerializer(OneOfSchema):
    model_type_field = 'parcel_type'
    type_field = 'referenceParcelType'
    type_field_remove = True
    type_schemas = {
        ReferenceParcelTypes.AgriculturalParcel.value: AgriculturalParcelSerializer,
        ReferenceParcelTypes.PhysicalBlock.value: PhysicalBlockSerializer,
    }


    class Meta:
        model = ReferenceParcel
        load_instance = False
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        model_converter = GeometryModelConverter
        # load_instance = False


@api.serializer(many=True)
class ReferenceParcelListSerializer(ReferenceParcelSerializer):
    class Meta:
        model = ReferenceParcel
        load_instance = False
        fields = REFERENCE_PARCEL_BASE_DATA_FIELDS
        model_converter = GeometryModelConverter
        # load_instance = False

