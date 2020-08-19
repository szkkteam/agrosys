#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import CropTemplate
from ..models import Plan


DATA_FIELDS = (
    'id',
    'title',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class PlanSerializer(ModelSerializer):

    use_as_template = fields.Boolean(required=False, allow_none=True)
    crop_template_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, CropTemplate))
    tasks = fields.Nested('TaskListSerializer', many=True, required=False)

    class Meta:
        model = Plan
        fields = DATA_FIELDS + ('crop_template_id', 'use_as_template', 'tasks')
        dump_only = ('id', )
        load_only = ('use_as_template', )
        include_fk = True

@api.serializer(many=True)
class PlanListSerializer(PlanSerializer):

    #field_details = fields.Nested('FieldDetailListSerializer', dump_only=True, only=('id', 'area', 'field'),required=False, many=True)

    class Meta:
        model = Plan
        fields = DATA_FIELDS + ('crop_template_id', 'use_as_template', )
        dump_only = ('id', )
        #include_relationships = True