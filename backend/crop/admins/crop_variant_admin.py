#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.admin import ModelAdmin, macro

from ..models import CropVariant



class CropVariantAdmin(ModelAdmin):
    model = CropVariant

    can_create = True
    can_edit = True
    can_delete = True

    create_modal = True
    edit_modal = True
    details_modal = True

    column_list = ('title', 'description', 'latin', 'yield_modifier')

    column_editable_list = ('title', 'description', 'latin', 'yield_modifier')

    column_details_list = ('id', 'title', 'description', 'latin', 'yield_modifier')
