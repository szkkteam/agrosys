#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports

# Internal package imports
from backend.admin import ModelAdmin, macro

from ..models import SoilType

class SoilTypeAdmin(ModelAdmin):
    model = SoilType

    can_create = True
    can_edit = True
    can_delete = True

    column_list = ( 'title', 'yield_modifier', )

    column_editable_list = ('title', 'yield_modifier')

    column_details_list = ('title', 'yield_modifier')
