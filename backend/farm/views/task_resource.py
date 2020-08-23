#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial

# Pip package imports
# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.api.decorators import param_converter
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from ..models import Task, Plan
from .blueprint import farm

@api.model_resource(farm, Task, '/plans/<int:plan_id>/tasks', '/plans/tasks/<int:task_task_id>')
class TaskResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, ),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
        LIST: (auth_required, ),
    }

    @param_converter(plan_id=int)
    def create(self, task, errors, plan_id, **kwargs):
        if errors:
            return self.errors(errors)
        plan = Plan.query.get_or_404(plan_id)
        plan.tasks.append(task)
        return self.created(task)

    @param_converter(plan_id=int)
    def list(self, plan_id, **kwargs):
        plan = Plan.query.get_or_404(plan_id)
        return self.serializer.dump(plan.tasks, many=True)



