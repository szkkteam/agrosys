#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from flask import abort
from http import HTTPStatus

# Pip package imports
from loguru import logger
from flask import jsonify

# Internal package imports
from backend.api import ModelResource, Resource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.api.decorators import param_converter
from backend.security.models import User
from backend.extensions.api import api
from backend.permissions.decorators import permission_required
from backend.permissions.services import ResourceService, UserService
from backend.reference.models import Country, ReferenceParcelType

from ..models import ReferenceParcel, Season, SeasonReferenceParcel, ReferenceParcelRelation
from ..services import SearchReferenceParcel
from .blueprint import farm

@api.model_resource(farm, ReferenceParcel, '/parcels', '/parcels/<int:id>')
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
                    '/seasons/<int:season_id>/parcels',
                    '/seasons/<int:season_id>/parcels/<int:parcel_id>',
                    endpoint=(
                        "season_reference_parcel_resource",
                        "season_reference_parcels_resource",))
class SeasonReferenceParcelResource(ModelResource):
    """Resource to create a parcel and immidiatly assign it to a season. Also relationships are handled here."""
    include_methods = (CREATE, LIST, DELETE, PUT)
    exclude_decorators = (LIST, PUT, DELETE)
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

    @param_converter(season_id=int, parcel_id=int)
    def put(self, season_id=None, parcel_id=None, **kwargs):
        season = Season.query.get_or_404(season_id)
        parcel = ReferenceParcel.query.get_or_404(parcel_id)
        season.reference_parcels.append(parcel)
        return self.updated(parcel)

    @param_converter(season_id=int, parcel_id=int)
    def delete(self, season_id, parcel_id, **kwargs):
        fdp = SeasonReferenceParcel.filter_by(season_id=season_id, reference_parcel_id=parcel_id).first_or_404()
        return self.deleted(fdp)


@api.model_resource(farm, ReferenceParcel,
                    '/groups/<int:group_id>/parcels',
                    '/groups/<int:group_id>/parcels/<int:parcel_id>',
                    endpoint=(
                        "group_reference_parcel_resource",
                        "group_reference_parcels_resource",))
class GroupReferenceParcelResource(ModelResource):
    """Resource to create a parcel as a child of another parcel. Also relationships are handled here"""
    include_methods = (CREATE, LIST, DELETE, PUT)
    exclude_decorators = (LIST, PUT, DELETE)
    method_decorators = {
        CREATE: (auth_required,),
        LIST: (auth_required,),
        DELETE: (auth_required,),
        PUT: (auth_required,),
    }

    def create(self, reference_parcel, errors, **kwargs):
        if errors:
            return self.errors(errors)
        # Get the season object
        group = ReferenceParcel.query.get_or_404(kwargs['group_id'])
        group.parcels_add.append(reference_parcel)
        #c = ReferenceParcelRelation(group=group, parcel=reference_parcel)
        #c.save()
        return self.created(reference_parcel)

    @param_converter(group_id=int)
    def list(self, group_id, *args, **kwargs):
        return ReferenceParcel.query.get_or_404(group_id).parcels
        #result = ReferenceParcel.join(ReferenceParcelRelation, (ReferenceParcel.id == ReferenceParcelRelation.parcel_id)).filter(ReferenceParcelRelation.group_id == group_id)
        #return self.serializer.dump(result, many=True)

    @param_converter(group_id=int, parcel_id=int)
    def put(self, group_id=None, parcel_id=None, **kwargs):
        group = ReferenceParcel.query.get_or_404(group_id)
        parcel = ReferenceParcel.query.get_or_404(parcel_id)
        group.parcels_add.append(parcel)
        #group.parcels.append(parcel)
        return self.updated(group)

    @param_converter(group_id=int, parcel_id=int)
    def delete(self, group_id, parcel_id, **kwargs):
        fdp = ReferenceParcelRelation.filter_by(group_id=group_id, parcel_id=parcel_id).first()
        return self.deleted(fdp)


@api.route('/parcels/search')
@param_converter(name=str, country_id=int, parcel_type_id=int)
def search_reference_parcels(name, country_id, parcel_type_id):
    country = Country.query.get_or_404(country_id)
    parcel_type = ReferenceParcelType.query.get_or_404(parcel_type_id)
    try:
        if country.iso3 == "HUN":
            res = SearchReferenceParcel.search_parcel_hu(parcel_type.code, name)
        else:
            abort(HTTPStatus.NOT_IMPLEMENTED)
    except Exception as e:
        logger.error("Searching for parcel crashed. Name: %s Country ID: %s Parcel Type ID: %s, Error: %s" %(name, country_id, parcel_type_id, e))
        abort(HTTPStatus.INTERNAL_SERVER_ERROR)
    else:
        return jsonify(res)


