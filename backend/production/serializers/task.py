#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow_enum import EnumField

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import Task, TaskStatus

TASK_FIELDS = (
    'id',
    'title',
    'description',
    'start_date',
    'end_date',
    'predicted_cost',
    'actual_cost',
    'task_name',
    'task_type',
)


class TaskSerializer(ModelSerializer):

    status = EnumField(TaskStatus, by_value=True)

    class Meta:
        model = Task
        fields = TASK_FIELDS
        #load_instance = False


@api.serializer(many=True)
class TaskListSerializer(TaskSerializer):

    class Meta:
        model = Task
        fields = TASK_FIELDS
        #load_instance = False