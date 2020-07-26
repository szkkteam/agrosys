#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask import after_this_request, current_app, url_for, request, abort
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.api import ModelResource, ALL_METHODS, CREATE, DELETE, GET, LIST, PATCH, PUT
from backend.security.decorators import auth_required
from backend.api.decorators import param_converter
from backend.extensions.api import api
from backend.extensions import db

from ..models import CropVariant, CropTemplate
from .blueprint import crop



@api.model_resource(crop, CropVariant, '/variant')
class CropVariantResource(ModelResource):
    include_methods = (LIST,)
    exclude_decorators = (LIST,)

    @param_converter(base=int, variant=int)
    def list(self, base=None, cultivation_type=None, *args, **kwargs):
        if base or cultivation_type:
            q = db.session.query(CropVariant). \
                join(CropTemplate, (CropTemplate.crop_cultivation_type_id == CropVariant.id)). \
                distinct()
            if base:
                q = q.filter(CropTemplate.crop_base_id == base)
            if cultivation_type:
                q = q.filter(CropTemplate.crop_cultivation_type_id == cultivation_type)
            result = q.all()
        else:
            result = CropVariant.all()
        return self.serializer.dump(result, many=True)
