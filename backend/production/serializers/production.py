#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.database import db
from backend.api import ModelSerializer, validates, ValidationError
from backend.api import fields
from backend.crop.models import CropTemplate

from ..models import Production

PRODUCTION_FIELDS = (
    'id',
    'title',
)


class ProductionSerializer(ModelSerializer):

    #shape = fields.Pluck('FieldDataSerializer', 'shape')
    #value = fields.Pluck('FieldDataSerializer', 'value', missing=True, allow_none=True)
    #field = fields.Nested('FieldDataSerializer', many=False, required=True)
    #value = fields.Nested('FieldDataSerializer', only=('value',), many=False)
    #field_details = m_fields.Nested('FieldDetailListSerializer', many=True, data_key='fields')
    #role = m_fields.Nested('FieldPermissionSerializer', many=False)

    class Meta:
        model = Production
        fields = PRODUCTION_FIELDS + ('crop_template_id',)
        #dump_only = ('id', 'created_at', 'soil_type')
        #load_only = ('crop_template_id',)
        #include_fk = True
        #exclude = tuple(prop.key
        #                for prop in Production.__mapper__.iterate_properties
        #                if hasattr(prop, 'direction'))

    """
    @validates('crop_template_id')
    def validate_id(self, crop_template_id):
        inst = db.session.query(CropTemplate).get(crop_template_id)
        if not inst:
            raise ValidationError('Not a valid ID.', 'crop_template_id')
        return

    def load(self, data, many=None, partial=None, unknown=None, session=None, instance=None, transient=False, **kwargs):

        def _load_cop_template(result, data):
            if 'cropTemplateId' in data:
                result.soil_type = CropTemplate.get(data.get('cropTemplateId'))
            return result

        result = super().load(data, many=many, partial=partial, unknown=unknown, session=session, instance=instance, transient=transient, **kwargs)

        if many or isinstance(data, list):
            result = [_load_cop_template(r, d) for d, r in zip(data, result)]
        else:
            result = _load_cop_template(result, data)
        return result
    """

@api.serializer(many=True)
class ProductionListSerializer(ProductionSerializer):

    class Meta:
        model = Production
        fields = PRODUCTION_FIELDS
        #dump_only = ('id', 'role')
