#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.admin import ModelAdmin, macro

from ..models import Unit



class UnitAdmin(ModelAdmin):
    model = Unit

    can_create = True
    can_edit = True
    can_delete = True

    create_modal = True
    edit_modal = True
    details_modal = True

    column_list = ('title', )

    column_editable_list = ('title', )

    column_details_list = ('title', )
