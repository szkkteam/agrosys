#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from ..models import PlanTaskGeneral, TaskStatus, TaskTypes
from .task_base import PlanTaskBaseSerializer, PLAN_TASK_BASE_FIELDS

#@api.serializer
class PlanTaskGeneralSerializer(PlanTaskBaseSerializer):

    class Meta:
        model = PlanTaskGeneral
        fields = PLAN_TASK_BASE_FIELDS
        #load_instance = False
