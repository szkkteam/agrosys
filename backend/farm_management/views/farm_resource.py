#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app, url_for
from flask_security import current_user
from sqlalchemy import and_

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.extensions import db
from backend.utils.decorators import wrap_decorator


from ..models import Farm, Season
from .blueprint import farm_management
from ..decorators import permission_required

from backend.security.models import UserRole

def get_farm_details(farm):
    return {
            'id': farm.id,
            'name': farm.name,
            'seasons': Season.filter(Season.farm_id == farm.id).all(),
            # TODO: List permissions
            #'role': UserFarm.filter(UserFarm.farm_id == farm.id).filter(UserFarm.user_id == current_user.id).first()
        }

@api.model_resource(farm_management, Farm, '/farms', '/farms/<int:farm_id>')
class FarmResource(ModelResource):
    include_methods = ALL_METHODS
    #method_decorators = (wrap_decorator(auth_required, role='ROLE_ADMIN'),)
    #method_decorators = (auth_required, )
    method_decorators = {
        CREATE: (auth_required,),
        DELETE: (auth_required, wrap_decorator(permission_required, model=Farm, permission='delete')),
        #GET: (auth_required, wrap_decorator(permission_required, model=Farm, permission='view')),
        LIST: (auth_required, wrap_decorator(permission_required, model=Farm, permission='view')),
        PATCH: (auth_required, wrap_decorator(permission_required, model=Farm, permission='edit')),
        PUT: (auth_required, wrap_decorator(permission_required, model=Farm, permission='edit')),
    }

    def create(self, farm, errors):
        if errors:
            return self.errors(errors)
        # Get the current user object
        user = User.get(current_user.id)
        # Manually create the association table
        # TODO: Fixme permission
        #user_farm = UserFarm.create_farm_owner(user=user, farm=farm)
        #user_farm.save()
        return self.created(farm)

    def get(self, farm):
        return self.serializer.dump(get_farm_details(farm))

    @permission_required(model=Farm, permission='view')
    def list(self, farms):
        return self.serializer.dump([get_farm_details(farm) for farm in farms], many=True)





