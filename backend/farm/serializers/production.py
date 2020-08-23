#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import CropTemplate
from ..models import Production


DATA_FIELDS = (
    'id',
    'title',
    'tasks',
    'crop_template',
    'crop_template_id',
)

def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

class ProductionSerializer(ModelSerializer):

    crop_template = fields.Nested('CropTemplateSerializer', many=False)
    crop_template_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, CropTemplate))

    tasks = fields.Nested('TaskListSerializer', many=True, required=False)

    class Meta:
        model = Production
        fields = DATA_FIELDS
        dump_only = ('id', 'crop_template',)
        load_only = ('crop_template_id', )
        #include_fk = True

@api.serializer(many=True)
class ProductionListSerializer(ProductionSerializer):

    #field_details = fields.Nested('FieldDetailListSerializer', dump_only=True, only=('id', 'area', 'field'),required=False, many=True)

    class Meta:
        model = Production
        fields = DATA_FIELDS
        dump_only = ('id', 'crop_template',)
        load_only = ('crop_template_id', )
        #include_relationships = True