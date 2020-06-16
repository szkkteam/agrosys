#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial

# Pip package imports
from flask import after_this_request, current_app, url_for
from flask_security import current_user
from sqlalchemy import desc
from sqlalchemy import and_

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.farm_management.models import Farm
from backend.extensions import db

from ..models import Field, FieldDetail
from .blueprint import field as field_bp

from backend.security.models import UserRole
from backend.permissions.services import ResourceService, UserService


def get_field_details(field, only_last=False):
    if only_last:
        field_details = FieldDetail.filter_by(field_id=field.id).order_by(desc(FieldDetail.created_at)).first()
    else:
        field_details = field.field_details
    return {
            'id': field.id,
            'title': field.title,
            'field_details': field_details,
            'role': {
                'is_owner': bool(field.owner_user_id == current_user.id),
                'permissions': [str(perm.perm_name) for perm in ResourceService.perms_for_user(field, User.get(current_user.id))]
            }
        }

def get_fields_with_permissions(permissions):
    user = User.get(current_user.id)
    return UserService.resources_with_perms(user, permissions, resource_types=['field']).all()

def get_field_farm_create_permission(**view_kwargs):
    if 'farm_id' not in view_kwargs:
        return None
    return Farm.get(view_kwargs.get('farm_id'))


@api.model_resource(field_bp, Field, '/farms/<int:farm_id>/fields', '/fields/<int:field_id>')
class FieldResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required,),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    # TODO: Check if user has permission to create field.
    @permission_required(permission='create', resource=get_field_farm_create_permission)
    def create(self, field, errors, **kwargs):
        if errors:
            return self.errors(errors)
        # Get the current user object
        user = User.get(current_user.id)
        # Add farm to user's resource. The user will be the owner of this resource
        field.farm_id = kwargs.get('farm_id')
        print("Field: ", field)
        user.resources.append(field)
        return self.created(field)

    # TODO: permission_required decorator is not working as method_decorator. Method decorators are called before the instance is present.
    @permission_required(permission='edit', resource='field')
    def put(self, field, errors):
        if errors:
            return self.errors(errors)
        return self.updated(field)

    @permission_required(permission='edit', resource='field')
    def patch(self, field, errors):
        if errors:
            return self.errors(errors)
        return self.updated(field)

    @permission_required(permission='delete', resource='field')
    def delete(self, field):
        return self.deleted(field)

    @permission_required(permission='view', resource='field')
    def get(self, field):
        return self.serializer.dump(get_field_details(field, only_last=True))

    @auth_required
    def list(self, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        fields = get_fields_with_permissions(['edit', 'view', 'delete', 'create'])
        print("field authorized: ", fields)
        return self.serializer.dump([get_field_details(field) for field in fields], many=True)





