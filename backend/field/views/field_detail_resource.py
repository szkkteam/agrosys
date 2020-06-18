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

def get_field_by_parent(**view_kwargs):
    fd = FieldDetail.get(view_kwargs.get('field_detail_id'))
    if fd:
        return fd.field

def get_field_by_field_id(**view_kwargs):
    if 'field_id' not in view_kwargs:
        return None
    return Field.get(view_kwargs.get('field_id'))


@api.model_resource(field_bp, FieldDetail, 'fields/<int:field_id>/detail', '/fields/detail/<int:field_detail_id>')
class FieldDetailResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, partial(permission_required, **dict(permission='create', resource=get_field_by_field_id))),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    # TODO: For POST request the method decorator is not working here because we have an incomplete model (field_id = None, which is not valid)
    # Therefore the permission query is executed and SQLAlchemy tries to perform a flush before querying. This causing an integrity error
    #@permission_required(permission='create', resource=get_field_by_field_id)
    def create(self, field_detail, errors, **kwargs):
        if errors:
            return self.errors(errors)
        field = Field.get(kwargs.get('field_id'))
        # Assign the field_detail to the parent field
        field_detail.field = field
        return self.created(field_detail)

    # TODO: permission_required decorator is not working as method_decorator. Method decorators are called before the instance is present.
    @permission_required(permission='edit', resource=get_field_by_parent)
    def put(self, field_detail, errors):
        if errors:
            return self.errors(errors)
        return self.updated(field_detail)

    @permission_required(permission='edit', resource=get_field_by_parent)
    def patch(self, field_detail, errors):
        if errors:
            return self.errors(errors)
        return self.updated(field_detail)

    @permission_required(permission='delete', resource=get_field_by_parent)
    def delete(self, field_detail):
        return self.deleted(field_detail)

    @permission_required(permission='view', resource=get_field_by_parent)
    def get(self, field_detail):
        return self.serializer.dump(field_detail)

    @auth_required
    @permission_required(permission='view', resource=get_field_by_field_id)
    def list(self, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        field = Field.get(kwargs.get('field_id'))
        return self.serializer.dump(field.field_details, many=True)





