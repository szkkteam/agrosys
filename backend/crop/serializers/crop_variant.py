#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import CropVariant

CROP_VARIANT_FIELDS = (
    'id',
    'title',
    'latin',
    'description',
    'yield_modifier',
)


class CropVariantSerializer(ModelSerializer):

    class Meta:
        model = CropVariant
        fields = CROP_VARIANT_FIELDS
        #load_instance = False


@api.serializer(many=True)
class CropVariantListSerializer(CropVariantSerializer):

    class Meta:
        model = CropVariant
        fields = CROP_VARIANT_FIELDS
        #load_instance = False