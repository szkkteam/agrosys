#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from marshmallow import pre_load, post_dump, post_load, validates_schema, ValidationError

# Internal package imports
from backend.extensions.api import api
from backend.api import ModelSerializer

from ..models import Task, TaskTypes
from .task_general import TaskGeneralSerializer
from .task_pruning import TaskPruningSerializer

class OneOfSchema(ModelSerializer):

    type_field = "type"
    type_field_remove = True
    type_schemas = []

    def get_obj_type(self, obj):
        """Returns name of object schema"""
        return obj.__class__.__name__

    def dump(self, obj, *, many=None, **kwargs):
        errors = {}
        result_data = []
        result_errors = {}
        many = self.many if many is None else bool(many)
        if not many:
            result = result_data = self._dump(obj, **kwargs)
        else:
            for idx, o in enumerate(obj):
                try:
                    result = self._dump(o, **kwargs)
                    result_data.append(result)
                except ValidationError as error:
                    result_errors[idx] = error.normalized_messages()
                    result_data.append(error.valid_data)

        result = result_data
        errors = result_errors

        if not errors:
            return result
        else:
            exc = ValidationError(errors, data=obj, valid_data=result)
            raise exc

    def _dump(self, obj, *, update_fields=True, **kwargs):
        obj_type = self.get_obj_type(obj)
        if not obj_type:
            return (
                None,
                {"_schema": "Unknown object class: %s" % obj.__class__.__name__},
            )

        type_schema = self.type_schemas.get(obj_type)
        if not type_schema:
            return None, {"_schema": "Unsupported object type: %s" % obj_type}

        schema = type_schema if isinstance(type_schema, ModelSerializer) else type_schema()

        schema.context.update(getattr(self, "context", {}))

        result = schema.dump(obj, many=False, **kwargs)
        if result is not None:
            result[self.type_field] = obj_type
        return result

    def load(self, data, *, many=None, partial=None, unknown=None, **kwargs):
        errors = {}
        result_data = []
        result_errors = {}
        many = self.many if many is None else bool(many)
        if partial is None:
            partial = self.partial
        if not many:
            try:
                result = result_data = self._load(
                    data, partial=partial, unknown=unknown, **kwargs
                )
                #  result_data.append(result)
            except ValidationError as error:
                result_errors = error.normalized_messages()
                result_data.append(error.valid_data)
        else:
            for idx, item in enumerate(data):
                try:
                    result = self._load(item, partial=partial, **kwargs)
                    result_data.append(result)
                except ValidationError as error:
                    result_errors[idx] = error.normalized_messages()
                    result_data.append(error.valid_data)

        result = result_data
        errors = result_errors

        if not errors:
            return result
        else:
            exc = ValidationError(errors, data=data, valid_data=result)
            raise exc

    def _load(self, data, *, partial=None, unknown=None, **kwargs):
        if not isinstance(data, dict):
            raise ValidationError({"_schema": "Invalid data type: %s" % data})

        data = dict(data)
        unknown = unknown or self.unknown

        data_type = data.get(self.type_field)
        if self.type_field in data and self.type_field_remove:
            data.pop(self.type_field)

        if 'instance' in kwargs and not data_type:
            data_type = kwargs.get('instance').task_type.title().replace('_', '')
        if not data_type:
            print("self.type_field: ", self.type_field)
            raise ValidationError(
                {self.type_field: ["Missing data for required field."]}
            )


        try:
            type_schema = self.type_schemas.get(data_type)
        except TypeError:
            # data_type could be unhashable
            raise ValidationError({self.type_field: ["Invalid value: %s" % data_type]})
        if not type_schema:
            raise ValidationError(
                {self.type_field: ["Unsupported value: %s" % data_type]}
            )

        schema = type_schema if isinstance(type_schema, ModelSerializer) else type_schema()

        schema.context.update(getattr(self, "context", {}))

        return schema.load(data, many=False, partial=partial, unknown=unknown, **kwargs)

    def validate(self, data, *, many=None, partial=None, **kwargs):
        try:
            self.load(data, many=many, partial=partial, **kwargs)
        except ValidationError as ve:
            return ve.messages
        return {}



class TaskSerializer(OneOfSchema):
    type_field = 'taskType'
    type_schemas = {
        TaskTypes.TaskGeneral.value: TaskGeneralSerializer,
        TaskTypes.TaskPruning.value: TaskPruningSerializer,
    }


    class Meta:
        model = Task
        load_instance = False
        # load_instance = False


@api.serializer(many=True)
class TaskListSerializer(TaskSerializer):
    class Meta:
        model = Task
        load_instance = False
        # load_instance = False

