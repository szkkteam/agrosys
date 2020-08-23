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

from ..models import Template, Farm, FarmTemplate
from .blueprint import farm

@api.model_resource(farm, Template, '/<int:farm_id>/templates', '/templates/<int:id>')
class TemplateResource(ModelResource):
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
    # api/v1/farms/<farm_id>/templates [POST, LIST] -> post template under farm, list templates
    # api/v1/farms/templates/<template_id> [GET, PUT, PATCH, DELETE] ->  edit by

    # api/v1/farms<farm_id>/templates/<template_id> [PUT, DELETE] -> Relations
    @param_converter(farm_id=int)
    def create(self, template, errors, farm_id, **kwargs):
        if errors:
            return self.errors(errors)
        # Get the season object
        farm = Farm.query.get_or_404(farm_id)
        farm.templates.append(template)
        return self.created(template)

    @param_converter(farm_id=int)
    def list(self, farm_id, *args, **kwargs):
        templates = Template.join(FarmTemplate).filter(FarmTemplate.farm_id == farm_id).all()
        return  self.serializer.dump(templates, many=True)



@api.model_resource(farm, Template,
                    '/<int:farm_id>/templates/<int:template_id>',
                    endpoint='farm_template_resource')
class FarmTemplateResource(ModelResource):
    include_methods = (DELETE, PUT)
    exclude_decorators = (PUT, DELETE)
    method_decorators = {
        DELETE: (auth_required,),
        PUT: (auth_required,),
    }

    @param_converter(farm_id=int, template_id=int)
    def put(self, farm_id, template_id, *args, **kwargs):
        farm = Farm.query.get_or_404(farm_id)
        template = Template.query.get_or_404(template_id)
        farm.templates.append(template)
        return self.updated(template)

    @param_converter(farm_id=int, template_id=int)
    def delete(self, farm_id, template_id):
        ft = FarmTemplate.filter_by(farm_id=farm_id, template_id=template_id).first_or_404()
        return self.deleted(ft)

