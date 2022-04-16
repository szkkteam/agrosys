#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.admin import ModelAdmin

from ..models import Role


class RoleAdmin(ModelAdmin):
    model = Role

    menu_icon_value = 'glyphicon-check'

    column_searchable_list = ('name', 'description')
    column_sortable_list = ('name',)

    form_columns = ('name', 'description')
    form_excluded_columns = ('role_users', 'created_at', 'updated_at')

    column_details_list = ('name', 'description', 'created_at', 'updated_at')
