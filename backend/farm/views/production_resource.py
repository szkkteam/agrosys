#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import abort
from flask_security import current_user
from http import HTTPStatus

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.api.decorators import param_converter
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService

from ..models import BaseParcel, ReferenceParcel, BaseParcelProduction, Production
from ..serializers import ProductionListSerializer
from .blueprint import production

def get_production_details(production):
    #if only_last:
    #    production_details = FieldDetail.filter_by(field_id=field.id).order_by(desc(FieldDetail.created_at)).first()
    #else:
    #    production_details = field.field_details
    return {
            'id': production.id,
            'title': production.title,
            'tasks': production.tasks,
            'crop_template_id': production.crop_template_id,
            'field_details': BaseParcel.join(BaseParcelProduction).filter(BaseParcelProduction.production_id == production.id).all(),
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

def get_production_field_edit_permission(**view_kwargs):
    if 'field_detail_id' not in view_kwargs:
        return None
    return BaseParcel.get(view_kwargs.get('field_detail_id')).field


@api.model_resource(production, Production,
                    '/field-details/productions',
                    '/field-details/productions/<int:production_id>')
class ProductionResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, ),
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
        # Get the current user object
        user = User.get(current_user.id)
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
    @param_converter(field_detail_id=int)
    def list(self, field_detail_id=None, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        production_ids = None
        if field_detail_id:
            field_details = BaseParcel.get(field_detail_id)
            if not field_details:
                abort(HTTPStatus.NOT_FOUND)
            production_ids = [prod.id for prod in field_details.productions]

        return get_productions_with_permissions(['edit', 'view', 'delete', 'create'], filter_by_ids=production_ids)



@api.model_resource(production, Production, '/field-details/<int:field_detail_id>/productions/<int:production_id>', endpoint="assign_productions_resource")
class AssignProductionResource(ModelResource):
    include_methods = (PUT, DELETE)
    exclude_decorators = (PUT, DELETE)

    @permission_required(permission='edit', resource=get_production_field_edit_permission)
    @param_converter(field_detail_id=int, production_id=int)
    def put(self, field_detail_id=None, production_id=None, *args, **kwargs):
        field_detail = BaseParcel.get(field_detail_id)
        production = Production.get(production_id)
        if not field_detail and production:
            abort(HTTPStatus.NOT_FOUND)

        field_detail.productions.append(production)

        return self.updated(production)

    @permission_required(permission='delete', resource=get_production_field_edit_permission)
    def delete(self, field_detail_id=None, production_id=None, *args, **kwargs):
        field_detail = BaseParcel.get(field_detail_id)
        production = Production.get(production_id)
        if not field_detail and production:
            abort(HTTPStatus.NOT_FOUND)


        fdp = BaseParcelProduction.filter_by(production_id=production.id, field_detail_id=field_detail.id).first()
        return self.deleted(fdp)

    @auth_required
    def list(self, *args, **kwargs):
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        return ProductionListSerializer().dump(get_productions_with_permissions(['edit', 'view', 'delete', 'create']), many=True)
