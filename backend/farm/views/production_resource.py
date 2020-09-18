#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelResource, Resource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.api.decorators import param_converter
from backend.extensions.api import api

from ..models import Template, Farm, Production, ReferenceParcel, ReferenceParcelProduction
from .blueprint import farm

@api.model_resource(farm, Production, '/parcels/<int:parcel_id>/productions', '/productions/<int:id>')
class ProductionResource(ModelResource):
    """Resource to create a signle parcel without any assignment, or edit, get, delete a parcel based on primary key"""
    exclude_decorators = (LIST, )
    method_decorators = {
        CREATE: (auth_required, ),
        LIST: (auth_required, ),
        DELETE: (auth_required, ),
        GET: (auth_required, ),
        PATCH: (auth_required, ),
        PUT: (auth_required, ),
    }
    # api/v1/farms/parcels/<parcel_id>/templates [POST, LIST] -> post template under farm, list templates
    # api/v1/farms/templates/<template_id> [GET, PUT, PATCH, DELETE] ->  edit by

    # api/v1/farms<farm_id>/templates/<template_id> [PUT, DELETE] -> Relations
    @param_converter(parcel_id=int)
    def create(self, production, errors, parcel_id, **kwargs):
        if errors:
            return self.errors(errors)
        # Get the season object
        parcel = ReferenceParcel.query.get_or_404(parcel_id)
        parcel.productions.append(production)
        return self.created(production)

    @param_converter(parcel_id=int)
    def list(self, parcel_id, *args, **kwargs):
        productions = Production.join(ReferenceParcelProduction).filter(ReferenceParcelProduction.reference_parcel_id == parcel_id).all()
        return self.serializer.dump(productions, many=True)


@api.model_resource(farm, Production, '/<int:farm_id>/productions', endpoint='filter_productions_resource')
class FilterProductionResource(ModelResource):
    """Resource to create a signle parcel without any assignment, or edit, get, delete a parcel based on primary key"""
    include_decorators = (LIST, )
    method_decorators = {
        LIST: (auth_required, ),
    }

    @param_converter(farm_id=int)
    def list(self, farm_id, *args, **kwargs):
        assert False
        # TODO: Implement a lot of filtering logic
        productions = Production.join(ReferenceParcelProduction).filter(ReferenceParcelProduction.reference_parcel_id == parcel_id).all()
        return self.serializer.dump(productions, many=True)



@api.model_resource(farm, Production,
                    '/parcels/<int:parcel_id>/productions/<int:production_id>',
                    endpoint='reference_parcel_production_resource')
class ReferenceParcelProductionResource(ModelResource):
    include_methods = (DELETE, PUT)
    exclude_decorators = (PUT, DELETE)
    method_decorators = {
        DELETE: (auth_required,),
        PUT: (auth_required,),
    }

    @param_converter(parcel_id=int, production_id=int)
    def put(self, parcel_id, production_id, *args, **kwargs):
        parcel = ReferenceParcel.query.get_or_404(parcel_id)
        production = Production.query.get_or_404(production_id)
        parcel.productions.append(production)
        return self.updated(production)

    @param_converter(parcel_id=int, production_id=int)
    def delete(self, parcel_id, production_id):
        ft = ReferenceParcelProduction.filter_by(reference_parcel_id=parcel_id, production_id=production_id).first_or_404()
        return self.deleted(ft)

