#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from functools import partial

# Pip package imports
from flask_security import current_user
from sqlalchemy import desc

# Internal package imports
from backend.api import ModelResource, Resource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService

from ..models import ReferenceParcel, Season, SeasonReferenceParcel
from .blueprint import farm

@api.model_resource(farm, ReferenceParcel, '/parcels', '/parcels/<id>')
class ReferenceParcelResource(ModelResource):
    """Resource to create a signle parcel without any assignment, or edit, get, delete a parcel based on primary key"""
    include_methods = (CREATE, DELETE, GET, PATCH, PUT)
    method_decorators = {
        CREATE: (auth_required, ),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }


@api.model_resource(farm, ReferenceParcel,
                    '/seasons/<season_id>/parcels',
                    '/seasons/<season_id>/parcels/<parcel_id>',
                    endpoint=(
                        "season_reference_parcel_resource",
                        "season_reference_parcels_resource",))
class SeasonReferenceParcelResource(ModelResource):
    """Resource to create a parcel and immidiatly assign it to a season. Also relationships are handled here."""
    include_methods = (CREATE, LIST, DELETE, PUT)
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, ),
        LIST: (auth_required, ),
        DELETE: (auth_required, ),
        PUT: (auth_required, ),
    }

    def create(self, reference_parcel, errors, **kwargs):
        if errors:
            return self.errors(errors)
        # Get the season object
        season = Season.query.get_or_404(kwargs['season_id'])
        season.reference_parcels.append(reference_parcel)
        season.save()
        return self.created(reference_parcel)

    def list(self, *args, **kwargs):
        result = ReferenceParcel.join(SeasonReferenceParcel).filter(SeasonReferenceParcel.season_id == kwargs['season_id'])
        return self.serializer.dump(result, many=True)


@api.model_resource(farm, ReferenceParcel,
                    '/groups/<group_id>/parcels',
                    '/groups/<group_id>/parcels/<parcel_id>',
                    endpoint=(
                        "group_reference_parcel_resource",
                        "group_reference_parcels_resource",))
class GroupReferenceParcelResource(ModelResource):
    pass



@api.route('/parcels/search')
def search_reference_parcels():
    pass


