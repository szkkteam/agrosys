#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow_enum import EnumField
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import AgriculturalType

DATA_FIELDS = (
    'id',
    'title',
    'description',
)

class AgriculturalTypeSerializer(ModelSerializer):

    class Meta:
        model = AgriculturalType
        fields = DATA_FIELDS
        dump_only = ('id',)
        #load_instance = False


@api.serializer(many=True)
class AgriculturalTypeListSerializer(AgriculturalTypeSerializer):

    class Meta:
        model = AgriculturalType
        fields = DATA_FIELDS
        dump_only = ('id',)
        #load_instance = False