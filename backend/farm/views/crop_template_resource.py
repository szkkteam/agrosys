#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelResource, LIST
from backend.security.decorators import auth_required
from backend.api.decorators import param_converter
from backend.extensions.api import api
from backend.extensions import db

from ..models import CropBase, CropCultivationType, CropVariant, CropTemplate
from .blueprint import crop

@api.model_resource(crop, CropTemplate, '/templates')
class CropTemplateResource(ModelResource):
    include_methods = (LIST, )
    exclude_decorators = (LIST, )
    method_decorators = {
                 #partial(permission_required, **dict(permission='create', resource=get_field_farm_create_permission))),
        LIST: (auth_required,),
    }

    @param_converter(base=int, cultivation_type=int, variant=int)
    def list(self, base=None, cultivation_type=None, variant=None, *args, **kwargs):
        if cultivation_type or variant or base:
            q = db.session.query(CropTemplate)
            if base:
                q = q.filter(CropTemplate.crop_base_id == base)
            if cultivation_type:
                q = q.filter(CropTemplate.crop_cultivation_type_id == cultivation_type)
            if variant:
                q = q.filter(CropTemplate.crop_variant_id == variant)
            result = q.all()
        else:
            result = CropTemplate.all()
            print("result: ", result)
        return self.serializer.dump(result, many=True)


