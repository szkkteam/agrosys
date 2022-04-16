#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import PlanExecution

DATA_FIELDS = (
    'id',
    'title',
    'tasks',
)

class PlanExecutionSerializer(ModelSerializer):

    tasks = fields.Nested('ExecutionTaskListSerializer', many=True, required=False)
    # TODO: Add the following fields
    # - Ag. parcel
    # - Group
    # - Plan


    class Meta:
        model = PlanExecution
        fields = DATA_FIELDS
        #dump_only = ('id',)

@api.serializer(many=True)
class PlanExecutionListSerializer(PlanExecutionSerializer):

    class Meta:
        model = PlanExecution
        fields = DATA_FIELDS
        #dump_only = ('id',)
