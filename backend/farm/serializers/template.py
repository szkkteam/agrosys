#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import Template


DATA_FIELDS = (
    'id',
    'title',
    'tasks',
    'farms',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class TemplateSerializer(ModelSerializer):

    #crop_template = fields.Nested('CropTemplateSerializer', many=False, exclude=('plans', ))
    #crop_template_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, CropTemplate))

    tasks = fields.Nested('TaskListSerializer', many=True, required=False)
    farms = fields.Nested('FarmListSerializer', many=True)

    class Meta:
        model = Template
        fields = DATA_FIELDS
        dump_only = ('id', 'farms',)
        #include_fk = True

@api.serializer(many=True)
class TemplateListSerializer(TemplateSerializer):

    #field_details = fields.Nested('FieldDetailListSerializer', dump_only=True, only=('id', 'area', 'field'),required=False, many=True)

    class Meta:
        model = Template
        fields = DATA_FIELDS
        dump_only = ('id', 'farms', )
        #include_relationships = True