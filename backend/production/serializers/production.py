#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema

# Internal package imports
from backend.extensions.api import api
from backend.database import db
from backend.api import ModelSerializer, validates, ValidationError, fields
from backend.crop.models import CropTemplate

from ..models import Production


PRODUCTION_FIELDS = (
    'id',
    'title',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class ProductionSerializer(ModelSerializer):

    use_as_template = fields.Boolean(required=False, allow_none=True)
    crop_template_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, CropTemplate))
    tasks = fields.Nested('TaskListSerializer', many=True, required=False)

    class Meta:
        model = Production
        fields = PRODUCTION_FIELDS + ('crop_template_id', 'use_as_template', 'tasks')
        dump_only = ('id', )
        load_only = ('use_as_template', )
        include_fk = True

@api.serializer(many=True)
class ProductionListSerializer(ProductionSerializer):

    field_details = fields.Nested('FieldDetailListSerializer', dump_only=True, only=('id', 'area', 'field'),required=False, many=True)

    class Meta:
        model = Production
        fields = PRODUCTION_FIELDS + ('crop_template_id', 'use_as_template', 'field_details', )
        dump_only = ('id', 'field_details', )
        #include_relationships = True