#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import CropCultivationType

CROP_CULTIVATION_TYPE_FIELDS = (
    'id',
    'title',
    'description',
    'yield_modifier',
)


class CropCultivationTypeSerializer(ModelSerializer):

    class Meta:
        model = CropCultivationType
        fields = CROP_CULTIVATION_TYPE_FIELDS
        #load_instance = False


@api.serializer(many=True)
class CropCultivationTypeListSerializer(CropCultivationTypeSerializer):

    class Meta:
        model = CropCultivationType
        fields = CROP_CULTIVATION_TYPE_FIELDS
        #load_instance = False