#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, ALL_METHODS
from backend.security.decorators import auth_required_same_user
from backend.security.models import User
from backend.extensions.api import api

from ..models import Farm
from .blueprint import farm_management


@api.model_resource(farm_management, Farm, '/farms/<int:id>')
class FarmResource(ModelResource):
    include_methods = ALL_METHODS
    method_decorators = (auth_required_same_user,)

