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


class FieldSerializer(ModelSerializer):

    #shape = fields.Pluck('FieldDataSerializer', 'shape')
    #value = fields.Pluck('FieldDataSerializer', 'value', missing=True, allow_none=True)
    #field = fields.Nested('FieldDataSerializer', many=False, required=True)
    #value = fields.Nested('FieldDataSerializer', only=('value',), many=False)
    fields = m_fields.Nested('FieldDetailListSerializer', many=True, dump_to='field_details')
    role = m_fields.Nested('FieldPermissionSerializer', many=False)

    class Meta:
        model = Field
        fields = FIELD_FIELDS + ('field_details', 'role',)
        dump_only = ('id', )

@api.serializer(many=True)
class FieldListSerializer(FieldSerializer):

    fields = m_fields.Nested('FieldDetailSerializer', many=False, dump_to='field_details')
    role = m_fields.Nested('FieldPermissionSerializer', many=False)

    class Meta:
        model = Field
        fields = FIELD_FIELDS + ('field_details', 'role',)
        dump_only = ('id',)