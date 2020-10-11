#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from ..models import ExecutionTaskHarvesting
from .task_base import ExecutionTaskBaseSerializer, EXECUTION_TASK_BASE_FIELDS

#@api.serializer
class ExecutionTaskHarvestingSerializer(ExecutionTaskBaseSerializer):

    class Meta:
        model = ExecutionTaskHarvesting
        fields = EXECUTION_TASK_BASE_FIELDS
        #load_instance = False
