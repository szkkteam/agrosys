#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial

# Pip package imports
from flask import after_this_request, current_app, url_for, request, abort
from flask_security import current_user
from sqlalchemy import desc
from sqlalchemy import and_
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.api.decorators import param_converter
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.field.models import FieldDetail
from backend.extensions import db

from ..models import Task, Production
from .blueprint import production

from backend.security.models import UserRole
from backend.permissions.services import ResourceService, UserService

def get_production_by_parent(**view_kwargs):
    t = Task.get_by(task_id=view_kwargs.get('task_task_id'))
    if t:
        return t.production

def get_production_by_id(**view_kwargs):
    if 'production_id' not in view_kwargs:
        return None
    return Production.get(view_kwargs.get('production_id'))

@api.model_resource(production, Task, '/productions/<int:production_id>/tasks', '/productions/tasks/<int:task_task_id>')
class TaskResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, partial(permission_required, **dict(permission='create', resource=get_production_by_id, include_resource=True))),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    # TODO: Check if user has permission to create field.
    #def create(self, *args, **kwargs):
    def create(self, task, errors, **kwargs):
        if errors:
            return self.errors(errors)
        production = kwargs.get('resource')
        production.tasks.append(task)
        print("task: ", task)
        return self.created(task)

    # TODO: permission_required decorator is not working as method_decorator. Method decorators are called before the instance is present.
    @permission_required(permission='edit', resource=get_production_by_parent)
    def put(self, task, errors):
        if errors:
            return self.errors(errors)
        return self.updated(task)

    @permission_required(permission='edit', resource=get_production_by_parent)
    def patch(self, task, errors):
        if errors:
            return self.errors(errors)
        return self.updated(task)

    @permission_required(permission='delete', resource=get_production_by_parent)
    def delete(self, task):
        return self.deleted(task)

    @permission_required(permission='view', resource=get_production_by_parent)
    def get(self, task):
        return self.serializer.dump(task)

    @auth_required
    @permission_required(permission='view', resource=get_production_by_id, include_resource=True)
    def list(self, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        production = kwargs.get('resource')
        return self.serializer.dump(production.tasks, many=True)


