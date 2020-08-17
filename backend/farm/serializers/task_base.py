#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError
from marshmallow_enum import EnumField
import datetime as dt

# Internal package imports
from backend.api import ModelSerializer, fields


from ..models import Task, TaskStatus, TaskTypes

TASK_BASE_FIELDS = (
    'id',
    'title',
    'status',
    'description',
    'start_date',
    'end_date',
    'predicted_cost',
    'actual_cost',
    #'task_name',
    #'task_type',
)

class ComposableDict(fields.Dict):

    def __init__(self, inner, *args, **kwargs):
        self.inner = inner
        super().__init__(*args, **kwargs)

    def _serialize(self, value, attr, obj):
        return {
            key: self.inner._serialize(val, key, value)
            for key, val in value.items()
        }

class TaskDateSerializer(ModelSerializer):
    start_date = fields.AwareDateTime(default_timezone=dt.timezone.utc)
    end_date = fields.AwareDateTime(default_timezone=dt.timezone.utc)
    load_instance = False

class TaskBaseSerializer(ModelSerializer):

    task_type = EnumField(TaskTypes, by_value=True, required=True)
    status = EnumField(TaskStatus, by_value=True, required=False)

    #dates = fields.Nested('TaskDateSerializer', required=True)
    #dates = ComposableDict(fields.Nested(TaskDateSerializer), required=True)
    start_date =fields.AwareDateTime(default_timezone=dt.timezone.utc)
    end_date = fields.AwareDateTime(default_timezone=dt.timezone.utc)

    predicted_cost = fields.Decimal(as_string=True, required=False)
    actual_cost = fields.Decimal(as_string=True, required=False)

    def unwrap_date_field(self, data, **kwargs):
        print("Data: ", data)
        print("KWARGS: ", kwargs)
        if 'dates' in data:
            if not isinstance(data['dates'], dict):
                raise ValidationError('Dates field must be dict', 'dates')
            dates = data.pop('dates')
            data['startDate'] = dates['startDate']
            data['endDate'] = dates['endDate']
        elif not kwargs.get('partial', False):
            raise ValidationError('Field may not be null.', 'dates')
        return data

    def warp_date_field(self, data):
        start_date = data.pop('startDate')
        end_date = data.pop('endDate')
        data['dates'] = {
            'startDate': start_date,
            'endDate': end_date,
        }
        return data

    @pre_load(pass_many=True)
    def unwrap_date(self, data, many, **kwargs):
        if isinstance(data, (list, tuple)):
            return [self.unwrap_date_field(d, **kwargs) for d in data]
        else:
            return self.unwrap_date_field(data, **kwargs)

    @post_dump(pass_many=True)
    def wrap_date(self, data, many, **kwargs):
        if isinstance(data, (list, tuple)):
           return [self.warp_date_field(d) for d in data]
        else:
            return self.warp_date_field(data)

