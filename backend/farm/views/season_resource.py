#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports

# Pip package imports
from flask import abort
from http import HTTPStatus
from sqlalchemy.orm.exc import NoResultFound

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService

from ..models import Season, Farm
from .blueprint import farm


@api.model_resource(farm, Season, '/<int:farm_id>/seasons', '/seasons/<int:season_id>')
class SeasonResource(ModelResource):
    include_methods = ALL_METHODS
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required,),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }

    def create(self, season, errors, *args, **kwargs):
        if errors:
            return self.errors(errors)
        farm = Farm.query.get_or_404(kwargs['farm_id'])
        season.farm = farm
        return self.created(season)

    @auth_required
    def list(self, *args, **kwargs):
        assert False
        # Get farms with any permissions. TODO: ANY_PERMISSION object is not working ...
        farms = get_farms_with_permissions(['edit', 'view', 'delete', 'create'])
        return self.serializer.dump([get_farm_details(farm) for farm in farms], many=True)





