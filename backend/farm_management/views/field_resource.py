#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.extensions.api import api

from ..models import Field
from .blueprint import farm_management

@api.model_resource(farm_management, Field, '/field', '/field/<int:id>')
class FieldResource(ModelResource):
    include_methods = [CREATE, DELETE, GET, LIST, PATCH, PUT]
