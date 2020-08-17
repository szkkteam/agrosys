#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelResource, LIST
from backend.api.decorators import param_converter
from backend.extensions.api import api
from backend.extensions import db

from ..models import CropBase, CropTemplate
from .blueprint import crop



@api.model_resource(crop, CropBase, '/')
class CropBaseResource(ModelResource):
    include_methods = (LIST, )
    exclude_decorators = (LIST,)

    @param_converter(cultivation_type=int, variant=int)
    def list(self, cultivation_type=None, variant=None, *args, **kwargs):
        if cultivation_type or variant:
            q = db.session.query(CropBase). \
                join(CropTemplate, (CropTemplate.crop_base_id == CropBase.id)). \
                distinct()
            if cultivation_type:
                q = q.filter(CropTemplate.crop_cultivation_type_id == cultivation_type)
            if variant:
                q = q.filter(CropTemplate.crop_variant_id == variant)
            result =  q.all()
        else:
            result = CropBase.all()
        return self.serializer.dump(result, many=True)


