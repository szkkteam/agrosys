#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError

# Internal package imports
from backend.extensions.api import api
from backend.api import OneOfSchema

from ..models import ExecutionTask, TaskTypes
from .execution_task_general import ExecutionTaskGeneralSerializer
from .execution_task_harvesting import ExecutionTaskHarvestingSerializer



class ExecutionTaskSerializer(OneOfSchema):
    model_type_field = 'task_type'
    type_field = 'taskType'
    type_schemas = {
        TaskTypes.TaskGeneral.value: ExecutionTaskGeneralSerializer,
        TaskTypes.TaskHarvesting.value: ExecutionTaskHarvestingSerializer,
    }


    class Meta:
        model = ExecutionTask
        load_instance = False
        # load_instance = False


@api.serializer(many=True)
class ExecutionTaskListSerializer(ExecutionTaskSerializer):
    class Meta:
        model = ExecutionTask
        load_instance = False
        # load_instance = False

