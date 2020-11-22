#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import PlanExecutionGroup

DATA_FIELDS = (
    'id',
    'title',
    'plan_executions',
)

class PlanExecutionGroupSerializer(ModelSerializer):

    plan_executions = fields.Nested('PlanExecutionListSerializer', many=True, required=False)

    class Meta:
        model = PlanExecutionGroup
        fields = DATA_FIELDS
        #dump_only = ('id',)

@api.serializer(many=True)
class PlanExecutionGroupListSerializer(PlanExecutionGroupSerializer):

    class Meta:
        model = PlanExecutionGroup
        fields = DATA_FIELDS
        #dump_only = ('id',)
