#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.api import ModelResource, GET, LIST
from backend.extensions.api import api

from ..models import AgriculturalType
from .blueprint import reference


@api.model_resource(reference, AgriculturalType, '/agricultural-types', '/agricultural-types/<int:id>')
class AgriculturalTypeResource(ModelResource):
    include_methods = (GET, LIST, )




