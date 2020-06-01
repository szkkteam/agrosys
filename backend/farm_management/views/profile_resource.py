#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, CREATE, DELETE, GET, LIST, PATCH, PUT, param_converter
from backend.security.decorators import auth_required_same_user
from backend.security.models import User
from backend.extensions.api import api
from backend.utils import DecoratorGenerator

from ..models import Profile
from .blueprint import farm_management


@api.model_resource(farm_management, Profile, '/profiles/<int:id>')
class ProfileResource(ModelResource):
    include_methods = [GET, PATCH, PUT]
    method_decorators = {
        GET: [auth_required_same_user],
        PATCH: [auth_required_same_user],
        PUT: [auth_required_same_user],
    }
