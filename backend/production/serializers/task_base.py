#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow_enum import EnumField
import datetime as dt

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer, fields


from ..models import Task, TaskStatus, TaskTypes

TASK_BASE_FIELDS = (
    'id',
    'title',
    'description',
    'start_date',
    'end_date',
    'predicted_cost',
    'actual_cost',
    #'task_name',
    #'task_type',
)


class TaskBaseSerializer(ModelSerializer):

    task_type = EnumField(TaskTypes, by_value=True, required=True)
    status = EnumField(TaskStatus, by_value=True, required=False)

    start_date =fields.AwareDateTime(default_timezone=dt.timezone.utc)
    end_date = fields.AwareDateTime(default_timezone=dt.timezone.utc)

    predicted_cost = fields.Decimal(as_string=True)
    actual_cost = fields.Decimal(as_string=True)