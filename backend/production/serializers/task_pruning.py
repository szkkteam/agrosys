#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow_enum import EnumField

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import TaskPruning, TaskStatus, TaskTypes
from .task_base import TaskBaseSerializer, TASK_BASE_FIELDS

#@api.serializer
class TaskPruningSerializer(TaskBaseSerializer):

    class Meta:
        model = TaskPruning
        fields = TASK_BASE_FIELDS
        #load_instance = False
