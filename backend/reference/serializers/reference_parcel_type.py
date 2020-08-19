#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow_enum import EnumField
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import ReferenceParcelType, ReferenceParcelTypeEnum

DATA_FIELDS = (
    'id',
    'title',
    'description',
    'code',
)

class ReferenceParcelTypeSerializer(ModelSerializer):

    code = EnumField(ReferenceParcelTypeEnum, by_value=True, required=True)

    class Meta:
        model = ReferenceParcelType
        fields = DATA_FIELDS
        dump_only = ('id',)
        load_only = ('code', )
        #load_instance = False


@api.serializer(many=True)
class ReferenceParcelTypeListSerializer(ReferenceParcelTypeSerializer):

    class Meta:
        model = ReferenceParcelType
        fields = DATA_FIELDS
        dump_only = ('id',)
        load_only = ('code', )
        #load_instance = False