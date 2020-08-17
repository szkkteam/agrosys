#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial

# Pip package imports
from flask_security import current_user
from sqlalchemy import desc

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService

from ..models import ReferenceParcel, BaseParcel
from ..models import Farm
from .blueprint import parcel

def get_field_details(field, only_last=False):
    if only_last:
        field_details = [BaseParcel.filter_by(field_id=field.id).order_by(desc(BaseParcel.created_at)).first()]
    else:
        field_details = BaseParcel.filter_by(field_id=field.id).order_by(desc(BaseParcel.created_at))
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


@api.model_resource(parcel, ReferenceParcel, '/farms/<int:farm_id>/fields', '/fields/<int:field_id>')
class ReferenceParcelResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, partial(permission_required, **dict(permission='create', resource=get_field_farm_create_permission))),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    # TODO: Check if user has permission to create field.
    #def create(self, *args, **kwargs):
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
        return self.serializer.dump(get_field_details(field))

    @auth_required
    def list(self, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        fields = get_fields_with_permissions(['edit', 'view', 'delete', 'create'])
        print("field authorized: ", fields)
        return self.serializer.dump([get_field_details(field, only_last=True) for field in fields], many=True)




