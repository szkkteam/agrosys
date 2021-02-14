#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_sqlalchemy.model import camel_to_snake_case
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.extensions.marshmallow import ma

#from .constants import READ_ONLY_FIELDS
from .utils import camelcase
from backend.api import validates


class ModelSerializer(ma.ModelSchema):
    """
    Base class for database model serializers. This is pretty much a stock
    :class:`flask_marshmallow.sqla.ModelSchema`: it will automatically create
    fields from the attached database Model, the only difference being that it
    will automatically dump to (and load from) the camel-cased variants of the
    field names.

    For example::

        from backend.api import ModelSerializer
        from backend.security.models import Role

        class RoleSerializer(ModelSerializer):
            class Meta:
                model = Role

    Is roughly equivalent to::

        from marshmallow import Schema, fields

        class RoleSerializer(Schema):
            id = fields.Integer()
            name = fields.String()
            description = fields.String()
            created_at = fields.DateTime(dump_to='createdAt',
                                         load_from='createdAt')
            updated_at = fields.DateTime(dump_to='updatedAt',
                                         load_from='updatedAt')

    Obviously you probably shouldn't be loading `created_at` or `updated_at`
    from JSON; it's just an example to show the automatic snake-to-camelcase
    field naming conversion.
    """
    class Meta:
        dump_only = ('slug', 'createdAt', 'updatedAt')

    def is_create(self):
        """Check if we're creating a new object. Note that this context flag
        must be set from the outside, ie when the class gets instantiated.
        """
        return self.context.get('is_create', False)

    def on_bind_field(self, field_name, field_obj):
        converted = camelcase(field_obj.data_key or field_name)
        field_obj.data_key = converted

    @validates('id')
    def validate_id(self, id):
        #print("model_serializer self: ", self)
        # print("model_serializer model: ", self.model)
        #print("Validate ID: ", id)
        #print("is_create: ", self.is_create())
        if self.is_create() or int(id) == int(self.instance.id):
            return
        raise ValidationError('ids do not match')



class OneOfSchema(ModelSerializer):

    type_field = "type"
    type_field_remove = True
    type_schemas = []
    model_type_field = 'type'

    def __init__(self, *args, **kwargs):
        #print("OneOfSchema-init-args: ", args)
        #print("OneOfSchema-init-kwargs: ", kwargs)
        #print("Self exlude: ", self.exclude)
        super().__init__(*args, **kwargs)
        #print("Self exlude: ", self.exclude)

    def get_obj_type(self, obj):
        """Returns name of object schema"""
        return obj.__class__.__name__

    def dump(self, obj, many=None, *args, **kwargs):
        #print("Dumping one of sschema: ", obj)
        errors = {}
        result_data = []
        result_errors = {}
        many = self.many if many is None else bool(many)
        if not many:
            result = result_data = self._dump(obj, **kwargs)
        else:
            for idx, o in enumerate(obj):
                try:
                    result = self._dump(o, *args, **kwargs)
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

    def _dump(self, obj, update_fields=True, *args, **kwargs):
        obj_type = self.get_obj_type(obj)
        if not obj_type:
            return (
                None,
                {"_schema": "Unknown object class: %s" % obj.__class__.__name__},
            )

        type_schema = self.type_schemas.get(obj_type)
        if not type_schema:
            return None, {"_schema": "Unsupported object type: %s" % obj_type}

        #print("Dumping schema: ", type_schema)
        schema = type_schema if isinstance(type_schema, ModelSerializer) else type_schema(
            many=self.many,
            only=self.only,
            exclude=self.exclude,
            context=self.context,
        )

        schema.context.update(getattr(self, "context", {}))

        result = schema.dump(obj, many=False, *args, **kwargs)
        if result is not None:
            result[self.type_field] = obj_type
        return result

    def load(self, data, *, many=None, partial=None, unknown=None, **kwargs):
        #print("Loading one of schema: ", data)
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
            inst = kwargs.get('instance')
            #data_type = getattr(inst, self.model_type_field).title().replace('_', '')
            data_type = getattr(inst, self.model_type_field)
        if not data_type:
            #print("self.type_field: ", self.type_field)
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
        #print("Loading schema: ", type_schema)
        schema = type_schema if isinstance(type_schema, ModelSerializer) else type_schema(
            many=self.many,
            only=self.only,
            exclude=self.exclude,
            context=self.context,
        )

        schema.context.update(getattr(self, "context", {}))

        return schema.load(data, many=False, partial=partial, unknown=unknown, **kwargs)

    def validate(self, data, *, many=None, partial=None, **kwargs):
        try:
            self.load(data, many=many, partial=partial, **kwargs)
        except ValidationError as ve:
            return ve.messages
        return {}
