#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from ..models import TaskPruning
from .task_base import TaskBaseSerializer, TASK_BASE_FIELDS

#@api.serializer
class TaskPruningSerializer(TaskBaseSerializer):

    class Meta:
        model = TaskPruning
        fields = TASK_BASE_FIELDS
        #load_instance = False
