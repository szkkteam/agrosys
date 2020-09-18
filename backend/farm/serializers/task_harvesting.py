#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelSerializer, validates, ValidationError, fields
from backend.reference.models import SpecificProduct
from ..models import TaskHarvesting, TaskStatus, TaskTypes
from .task_base import TaskBaseSerializer, TASK_BASE_FIELDS

TASK_HARVEST_FIELDS = (
    'specific_product_id',
    'specific_product'
)


def object_id_exists(object_id, model):
    if not model.get_by(id=object_id):
        raise ValidationError('ID %i does not exist.' % (object_id))

#@api.serializer
class TaskHarvestingSerializer(TaskBaseSerializer):

    specific_product_id = fields.Integer(required=True, validate=lambda x: object_id_exists(x, SpecificProduct))
    specific_product = fields.Nested('SpecificProductSerializer', many=False)

    class Meta:
        model = TaskHarvesting
        fields = TASK_BASE_FIELDS + TASK_HARVEST_FIELDS
        load_only = ('specific_product_id', )
        dump_only = ('specific_product', )
        #load_instance = False
