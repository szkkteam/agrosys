#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelResource, LIST
from backend.api.decorators import param_converter
from backend.extensions.api import api
from backend.extensions import db

from ..models import CropVariant, CropTemplate
from .blueprint import crop



@api.model_resource(crop, CropVariant, '/variants')
class CropVariantResource(ModelResource):
    include_methods = (LIST,)
    exclude_decorators = (LIST,)

    @param_converter(base=int, variant=int)
    def list(self, base=None, cultivation_type=None, *args, **kwargs):
        if base or cultivation_type:
            q = db.session.query(CropVariant). \
                join(CropTemplate, (CropTemplate.crop_variant_id == CropVariant.id)). \
                distinct()
            if base:
                q = q.filter(CropTemplate.crop_base_id == base)
            if cultivation_type:
                q = q.filter(CropTemplate.crop_cultivation_type_id == cultivation_type)
            result = q.all()
        else:
            result = CropVariant.all()
        return self.serializer.dump(result, many=True)
