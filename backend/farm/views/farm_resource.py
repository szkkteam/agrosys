#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports

# Pip package imports
from flask_security import current_user

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService

from ..models import Farm
from .blueprint import farm

def get_farm_details(farm):
    return {
            'id': farm.id,
            'title': farm.title,
            'fields': farm.fields,
            #'seasons': Season.filter(Season.farm_id == farm.id).all(),
            'role': {
                'is_owner': bool(farm.owner_user_id == current_user.id),
                'permissions': [str(perm.perm_name) for perm in ResourceService.perms_for_user(farm, User.get(current_user.id))]
            }
        }

def get_farms_with_permissions(permissions):
    user = User.get(current_user.id)
    return UserService.resources_with_perms(user, permissions, resource_types=['farm']).all()

@api.model_resource(farm, Farm, '/farms', '/farms/<int:farm_id>')
class FarmResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required,),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    def create(self, farm, errors):
        if errors:
            return self.errors(errors)
        # Get the current user object
        user = User.get(current_user.id)
        # Add farm to user's resource. The user will be the owner of this resource
        user.resources.append(farm)
        return self.created(farm)

    # TODO: permission_required decorator is not working as method_decorator. Method decorators are called before the instance is present.
    @permission_required(permission='edit', resource='farm')
    def put(self, farm, errors):
        if errors:
            return self.errors(errors)
        return self.updated(farm)

    @permission_required(permission='edit', resource='farm')
    def patch(self, farm, errors):
        if errors:
            return self.errors(errors)
        return self.updated(farm)

    @permission_required(permission='delete', resource='farm')
    def delete(self, farm):
        return self.deleted(farm)

    @permission_required(permission='view', resource='farm')
    def get(self, farm):
        return self.serializer.dump(get_farm_details(farm))

    @auth_required
    def list(self):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        farms = get_farms_with_permissions(['edit', 'view', 'delete', 'create'])
        print("Farms authorized: ", farms)
        return self.serializer.dump([get_farm_details(farm) for farm in farms], many=True)





