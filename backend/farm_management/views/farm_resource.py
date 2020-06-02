#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app, url_for
from flask_security import current_user
from sqlalchemy import and_

# Internal package imports
from backend.api import ModelResource, ALL_METHODS
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.extensions import db
from backend.utils.decorators import wrap_decorator

from ..models import Farm, Field, UserFarm
from .blueprint import farm_management


from backend.security.models import UserRole

def get_farm_details(farm):
    return {
            'id': farm.id,
            'name': farm.name,
            'fields': Field.filter(Field.farm_id == farm.id).all(),
            'role': UserFarm.filter(UserFarm.farm_id == farm.id).filter(UserFarm.user_id == current_user.id).first()
        }

@api.model_resource(farm_management, Farm, '/user/<int:user_id>/farms', '/user/<int:user_id>/farms/<int:farm_id>')
class FarmResource(ModelResource):
    include_methods = ALL_METHODS
    #method_decorators = (wrap_decorator(auth_required, role='ROLE_ADMIN'),)
    method_decorators = (auth_required,)

    def create(self, farm, errors):
        if errors:
            return self.errors(errors)
        # Get the current user object
        user = User.get(current_user.id)
        # Manually create the association table
        user_farm = UserFarm.create_farm_owner(user=user, farm=farm)
        user_farm.save()
        return self.created(farm)

    def get(self, farm):
        return self.serializer.dump(get_farm_details(farm))

    def list(self, farms):
        return self.serializer.dump([get_farm_details(farm) for farm in farms], many=True)





