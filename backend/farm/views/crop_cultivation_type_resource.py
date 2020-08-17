#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelResource, LIST
from backend.api.decorators import param_converter
from backend.extensions.api import api
from backend.extensions import db

from ..models import CropCultivationType, CropTemplate
from .blueprint import crop



@api.model_resource(crop, CropCultivationType, '/cultivation-types')
class CropCultivationTypeResource(ModelResource):
    include_methods = (LIST,)
    exclude_decorators = (LIST,)

    @param_converter(base=int, variant=int)
    def list(self, base=None, variant=None, *args, **kwargs):
        if base or variant:
            q = db.session.query(CropCultivationType). \
                join(CropTemplate, (CropTemplate.crop_cultivation_type_id == CropCultivationType.id)). \
                distinct()
            if base:
                q = q.filter(CropTemplate.crop_base_id == base)
            if variant:
                q = q.filter(CropTemplate.crop_variant_id == variant)
            result = q.all()
        else:
            result = CropCultivationType.all()
        return self.serializer.dump(result, many=True)
