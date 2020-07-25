#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_admin.model.form import InlineFormAdmin

# Internal package imports
from backend.admin import ModelAdmin, macro

from ..models import CropTemplate


class CropTemplateAdmin(ModelAdmin):
    model = CropTemplate

    can_create = True
    can_edit = True
    can_delete = True

    create_modal = True
    edit_modal = True
    details_modal = True

    column_list = ( 'title', 'crop_base.title' )

    column_editable_list = ('title',)

    column_details_list = ('title', )
