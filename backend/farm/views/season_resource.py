#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import datetime

# Pip package imports
from flask import abort
from http import HTTPStatus
from sqlalchemy.orm.exc import NoResultFound

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.api.decorators import param_converter
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService
from backend.utils.url_helpers import DateConverter

from ..models import Season, Farm
from ..serializers import SeasonSerializer
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
        LIST: (auth_required, ),
    }

    def create(self, season, errors, *args, **kwargs):
        if errors:
            return self.errors(errors)
        farm = Farm.query.get_or_404(kwargs['farm_id'])
        season.farm = farm
        return self.created(season)

    @param_converter(start=DateConverter, end=DateConverter)
    def list(self, start=None, end=None, *args, **kwargs):
        # Construct a base query.
        q = Season.query.filter(Season.farm_id == kwargs['farm_id'])
        if start:
            q = q.filter(Season.created_at >= start)
        if end:
            q = q.filter(Season.archived_at <= end)
        return self.serializer.dump(q.all(), many=True)


@api.model_resource(farm, Season, '/seasons/archive/<int:season_id>', endpoint="archive_season_resource")
class ArchiveSeasonResource(ModelResource):
    include_methods = (PUT, )
    exclude_decorators = (PUT, )
    method_decorators = {
        PUT: (auth_required, ),
    }

    def put(self, *args, **kwargs):
        from backend.utils.date import utcnow
        season = Season.query.get_or_404(kwargs['season_id'])
        season.archived_at = utcnow()
        return self.updated(season)




