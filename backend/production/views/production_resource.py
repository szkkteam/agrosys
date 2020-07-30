#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial

# Pip package imports
from flask import after_this_request, current_app, url_for, request, abort
from flask_security import current_user
from http import HTTPStatus
from sqlalchemy import desc
from sqlalchemy import and_
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.field.models import FieldDetail
from backend.extensions import db

from ..models import Production, FieldDetailProduction
from ..serializers import ProductionListSerializer
from .blueprint import production

from backend.security.models import UserRole
from backend.permissions.services import ResourceService, UserService

def get_production_details(production):
    #if only_last:
    #    production_details = FieldDetail.filter_by(field_id=field.id).order_by(desc(FieldDetail.created_at)).first()
    #else:
    #    production_details = field.field_details
    return {
            'id': production.id,
            'title': production.title,
            'crop_template_id': production.crop_template_id,
            'field_details': FieldDetail.join(FieldDetailProduction).filter(FieldDetailProduction.production_id == production.id).all(),
            'use_as_template': production.use_as_template,
            #'field_details': field_details,
            'role': {
                'is_owner': bool(production.owner_user_id == current_user.id),
                'permissions': [str(perm.perm_name) for perm in ResourceService.perms_for_user(production, User.get(current_user.id))]
            }
        }

def get_productions_with_permissions(permissions, filter_by_ids=None):
    user = User.get(current_user.id)
    return UserService.resources_with_perms(user, permissions, resource_ids=filter_by_ids, resource_types=['production']).all()

def get_production_field_create_permission(**view_kwargs):
    if 'field_detail_id' not in view_kwargs:
        return None
    return FieldDetail.get(view_kwargs.get('field_detail_id')).field


@api.model_resource(production, Production,
                    '/fields/details/<int:field_detail_id>/productions',
                    '/fields/details/productions/<int:production_id>')
class ProductionResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, partial(permission_required, **dict(permission='create', resource=get_production_field_create_permission))),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    # TODO: Check if user has permission to create field.
    #def create(self, *args, **kwargs):
    def create(self, production, errors, **kwargs):
        if errors:
            return self.errors(errors)
        # TODO: Check if the newly created production first task's start_date and the last tasks's end_date is not overlapping with any of the details in the current field.

        # Get the current user object
        user = User.get(current_user.id)
        # Add the production to the corresponding field detail
        field_detail = FieldDetail.get(kwargs.get('field_detail_id'))
        field_detail.productions.append(production)
        production.farm_id = kwargs.get('field_detail_id')
        print("Field: ", production)
        # Add production to user's resource. The user will be the owner of this resource
        user.resources.append(production)
        return self.created(production)

    # TODO: permission_required decorator is not working as method_decorator. Method decorators are called before the instance is present.
    @permission_required(permission='edit', resource='production')
    def put(self, production, errors):
        if errors:
            return self.errors(errors)
        return self.updated(production)

    @permission_required(permission='edit', resource='production')
    def patch(self, production, errors):
        if errors:
            return self.errors(errors)
        return self.updated(production)

    @permission_required(permission='delete', resource='production')
    def delete(self, production):
        return self.deleted(production)

    @permission_required(permission='view', resource='production')
    def get(self, production):
        return self.serializer.dump(get_production_details(production))

    @auth_required
    def list(self, **kwargs):
        print("kwagrs:", kwargs)
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        if 'field_detail_id' not in kwargs:
            return get_productions_with_permissions(['edit', 'view', 'delete', 'create'])

        field_details = FieldDetail.get(kwargs.get('field_detail_id'))
        production_ids = [prod.id for prod in field_details.productions ]
        return get_productions_with_permissions(['edit', 'view', 'delete', 'create'], filter_by_ids=production_ids)



@api.model_resource(production, Production, '/productions', endpoint="list_productions_resource")
class ListProductionResource(ModelResource):
    include_methods = (LIST, )
    exclude_decorators = (LIST, )

    @auth_required
    def list(self, *args, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        return ProductionListSerializer().dump(get_productions_with_permissions(['edit', 'view', 'delete', 'create']), many=True)
