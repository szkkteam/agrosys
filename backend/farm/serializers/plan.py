#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, validates, ValidationError, fields
from ..models import Plan

DATA_FIELDS = (
    'id',
    'title',
    'tasks',
)

class PlanSerializer(ModelSerializer):

    tasks = fields.Nested('PlanTaskListSerializer', many=True, required=False)

    class Meta:
        model = Plan
        fields = DATA_FIELDS
        #dump_only = ('id',)

@api.serializer(many=True)
class PlanListSerializer(PlanSerializer):

    class Meta:
        model = Plan
        fields = DATA_FIELDS
        #dump_only = ('id',)
