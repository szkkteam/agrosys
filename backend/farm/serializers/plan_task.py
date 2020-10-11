#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError

# Internal package imports
from backend.extensions.api import api
from backend.api import OneOfSchema

from ..models import PlanTask, TaskTypes
from .plan_task_general import PlanTaskGeneralSerializer
from .plan_task_harvesting import PlanTaskHarvestingSerializer



class PlanTaskSerializer(OneOfSchema):
    model_type_field = 'task_type'
    type_field = 'taskType'
    type_schemas = {
        TaskTypes.TaskGeneral.value: PlanTaskGeneralSerializer,
        TaskTypes.TaskHarvesting.value: PlanTaskHarvestingSerializer,
    }


    class Meta:
        model = PlanTask
        load_instance = False
        # load_instance = False


@api.serializer(many=True)
class PlanTaskListSerializer(PlanTaskSerializer):
    class Meta:
        model = PlanTask
        load_instance = False
        # load_instance = False

