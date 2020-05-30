#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app
from flask_security import current_user

# Internal package imports
from backend.api import ModelResource, ALL_METHODS
from backend.security.decorators import auth_required_same_user
from backend.security.models import User
from backend.extensions.api import api

from ..models import Farm, Farmer
from .blueprint import farm_management


@api.model_resource(farm_management, Farm, '/user/<int:id>/farms', '/user/<int:id>/farms/<int:farm_id>')
class FarmResource(ModelResource):
    include_methods = ALL_METHODS
    method_decorators = (auth_required_same_user,)

    def create(self, farm, errors):
        if errors:
            return self.errors(errors)
        farmer = Farmer.get_or_create_owner(user=current_user)
        # Add the farm to the farmer instance
        farmer.farms.append(farm)
        # Add the farmer to the session
        farmer.save()
        return self.created(farm)

    def get(self, id, farm):
        # TODO: define
        print("Id: ", id)
        print("Farm: ", farm)
        return farm

