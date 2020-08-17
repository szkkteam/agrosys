#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import CropBase

CROP_BASE_FIELDS = (
    'id',
    'title',
    'description',
    'base_yield',
)


class CropBaseSerializer(ModelSerializer):

    unit = fields.Nested('UnitSerializer', many=False)

    class Meta:
        model = CropBase
        fields = CROP_BASE_FIELDS + ('unit',)
        dump_only = ('unit',)
        #load_instance = False


@api.serializer(many=True)
class CropBaseListSerializer(CropBaseSerializer):
    unit = fields.Nested('UnitSerializer', many=False)

    class Meta:
        model = CropBase
        fields = CROP_BASE_FIELDS + ('unit',)
        dump_only = ('unit', )
        #load_instance = False