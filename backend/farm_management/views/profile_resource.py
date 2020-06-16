#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app

# Internal package imports
from backend.api import ModelResource, CREATE, DELETE, GET, LIST, PATCH, PUT, param_converter
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api

from ..models import Profile
from .blueprint import farm_management
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService


@api.model_resource(farm_management, Profile, '/users/<int:owner_user_id>/profile')
class ProfileResource(ModelResource):
    include_methods = [GET, PATCH, PUT]
    method_decorators = {
        GET: (auth_required,),
        PATCH: (auth_required,),
        PUT: (auth_required,),
    }


    # TODO: permission_required decorator is not working as method_decorator. Method decorators are called before the instance is present.
    @permission_required(permission='edit', resource='profile')
    def put(self, profile, errors):
        if errors:
            return self.errors(errors)
        return self.updated(profile)

    @permission_required(permission='edit', resource='profile')
    def patch(self, profile, errors):
        if errors:
            return self.errors(errors)
        return self.updated(profile)

    @permission_required(permission='view', resource='profile')
    def get(self, profile):
        return profile

"""
api/v1/farms/ POST, LIST
api/v1/farms/<farm_id> PUT, PATCH, GET, DELETE

api/v1/farms/<farm_id>/seasons POST, LIST
api/v1/seasons/<season_id> PUT, PATCH, GET, DELETE

api/v1/seasons/<season_id>/fields/ POST, LIST
api/v1/seasons/<season_id>/fields/<field_id>/ PUT, PATCH, GET, DELETE

api/v1/seasons/<season_id>/field/<field_id>/actions POST, LIST
api/v1/actions/<action_id> PUT, PATCH, GET, DELETE

api/v1/seasons/<season_id>/field/<field_id>/notes POST, LIST
api/v1/notes/<note_id> PUT, PATCH, GET, DELETE

api/v1/seasons/<season_id>/field/<field_id>/weather POST, LIST

"""