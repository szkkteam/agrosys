#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError
from backend.api import fields as m_fields


from ..models import Field

FIELD_FIELDS = (
    'id',
    'title',
)

FIELD_PERMISSION_FIELDS = (
    'is_owner', 'permissions'
)

class FieldSerializer(ModelSerializer):

    #shape = fields.Pluck('FieldDataSerializer', 'shape')
    #value = fields.Pluck('FieldDataSerializer', 'value', missing=True, allow_none=True)
    #field = fields.Nested('FieldDataSerializer', many=False, required=True)
    #value = fields.Nested('FieldDataSerializer', only=('value',), many=False)
    field_details = m_fields.Nested('FieldDetailListSerializer', many=True, data_key='fields')
    role = m_fields.Nested('FieldPermissionSerializer', many=False)

    class Meta:
        model = Field
        fields = FIELD_FIELDS + ('field_details', 'role',)
        dump_only = ('id', 'role')

@api.serializer(many=True)
class FieldListSerializer(FieldSerializer):

    field_details = m_fields.Nested('FieldDetailListSerializer', many=True, data_key='fields')
    role = m_fields.Nested('FieldPermissionSerializer', many=False)

    class Meta:
        model = Field
        fields = FIELD_FIELDS + ('field_details', 'role',)
        dump_only = ('id', 'role')


class FieldPermissionSerializer(ModelSerializer):

    class Meta:
        model = Field
        fields = FIELD_PERMISSION_FIELDS
        dump_only = ('owner', 'permissions')
