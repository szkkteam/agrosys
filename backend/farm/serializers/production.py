#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import Production


DATA_FIELDS = (
    'id',
    'title',
    'tasks',
    'tasks_ordered',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class ProductionSerializer(ModelSerializer):

    #crop_template = fields.Nested('CropTemplateSerializer', many=False, exclude=('plans', ))
    #crop_template_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, CropTemplate))

    tasks = fields.Nested('TaskListSerializer', many=True, required=False, load_only=True)
    tasks_ordered = fields.Nested('TaskListSerializer', many=True, required=False, dump_only=True, data_key='tasks')

    class Meta:
        model = Production
        fields = DATA_FIELDS
        load_only = ('tasks',)
        dump_only = ('id', 'tasks_ordered')
        #include_fk = True

@api.serializer(many=True)
class ProductionListSerializer(ProductionSerializer):

    #field_details = fields.Nested('FieldDetailListSerializer', dump_only=True, only=('id', 'area', 'field'),required=False, many=True)

    class Meta:
        model = Production
        fields = DATA_FIELDS
        load_only = ('tasks',)
        dump_only = ('id', 'tasks_ordered')
        #include_relationships = True