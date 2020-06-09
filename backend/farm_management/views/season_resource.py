#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial
from http import HTTPStatus

# Pip package imports
from flask import after_this_request, current_app, url_for, request, abort
from flask_security import current_user
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.session import make_transient
from sqlalchemy import and_

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.extensions import db

from ..models import Season, Field, FieldData, SeasonField, Farm
from .blueprint import farm_management
from ..decorators import permission_required

from backend.permissions.services import ResourceService, UserService


def get_farm_details(farm):
    return {
            'id': farm.id,
            'name': farm.name,
            'seasons': Season.filter(Season.farm_id == farm.id).all(),
            'role': {
                'is_owner': bool(farm.owner_user_id == current_user.id),
                'permissions': [str(perm.perm_name) for perm in ResourceService.perms_for_user(farm, User.get(current_user.id))]
            }
        }

def get_permission_post_list(**view_kwargs):
    farm_id = view_kwargs.get('farm_id')
    return Farm.get(farm_id)

def get_permission_put_path_delete_get():
    pass

def get_farms_with_permissions(permissions):
    user = User.get(current_user.id)
    return UserService.resources_with_perms(user, permissions, resource_types=['farm']).all()


def copy_field(season, field, field_data):
    # Remove object from session
    db.session.expunge(field_data)
    make_transient(field_data)
    # Generate new ID
    field_data.id = None
    field_data.create_at = None
    # Add to session back
    field_data.save()
    obj = SeasonField(season=season, field=field, field_data=field_data)
    obj.save()


@api.model_resource(farm_management, Season, '/farms/<int:farm_id>/seasons', '/seasons/<int:season_id>')
class SeasonResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, CREATE)
    method_decorators = {
        CREATE: (auth_required,),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    @permission_required(permission='create', resource=get_permission_post_list)
    def create(self, *args, **kwargs):
        try:
            result = self.serializer_create.load(request.get_json())
        except ValidationError as v:
            errors = v.messages
            return errors
        copy_fields = result.pop('copy_fields', False)
        copy_from_season_id = result.pop('copy_from_season_id', None)

        # Create new Season object
        new_season = Season.create(**{ **result, **{'farm_id' :kwargs.get('farm_id') }})
        # Save the new object, but dont commit it yet
        new_season.save()

        if copy_fields and copy_from_season_id :
            # TODO: Validte source season permission
            try:
                # source_field_datas = [season_field.field_data for season_field in source_field_datas]
                #source_fields_ids = Field.query(Field.id).join(SeasonField, (Field.id == SeasonField.field_id)).filter(SeasonField.season_id == copy_from_season_id).all()
                source_fields = Field.join(SeasonField).filter(SeasonField.season_id == copy_from_season_id).all()
                source_fields_ids = [field.id for field in source_fields]
                source_field_datas = SeasonField.query(SeasonField.field_data).filter((SeasonField.field_id.in_(source_fields_ids), SeasonField.season_id == copy_from_season_id))

            except IntegrityError:
                abort(HTTPStatus.NOTFOUND)
            else:
                # Copy the objects
                for field, field_data in zip(source_fields, source_field_datas):
                    copy_field(new_season, field, field_data)

        return self.created(new_season)

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





