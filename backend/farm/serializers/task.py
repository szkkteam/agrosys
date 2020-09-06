#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError

# Internal package imports
from backend.extensions.api import api
from backend.api import OneOfSchema

from ..models import Task, TaskTypes
from .task_general import TaskGeneralSerializer
from .task_pruning import TaskPruningSerializer



class TaskSerializer(OneOfSchema):
    model_type_field = 'task_type'
    type_field = 'taskType'
    type_schemas = {
        TaskTypes.TaskGeneral.value: TaskGeneralSerializer,
        TaskTypes.TaskPruning.value: TaskPruningSerializer,
    }


    class Meta:
        model = Task
        load_instance = False
        # load_instance = False


@api.serializer(many=True)
class TaskListSerializer(TaskSerializer):
    class Meta:
        model = Task
        load_instance = False
        # load_instance = False

