#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_admin.actions import action

# Internal package imports
from backend.admin import ModelAdmin, macro
from backend.utils import string_to_bool

from ..models import NewsletterSubscribe

def init_newsletter_subscribe_model(self, row):
    """Initialize the NewsletterSubscribe model from sheet rows.
    :param self: FIXME: This is not the intended implementation, somehow self is passed along with row data, so be prepared with 2 input argument
    :param row: One row from the sheet. Give and dict and columns can be accessed by keywords
    :return: SqlAlchemy Model object.
    """
    try:
        email = row['email']
        is_active = string_to_bool(row['is_active'])
    except KeyError as err:
        raise KeyError("Column: %s not found." % err)
    return NewsletterSubscribe.create(email=email, is_active=is_active)

class NewsletterSubscribeAdmin(ModelAdmin):
    model = NewsletterSubscribe

    menu_icon_value = 'glyphicon-envelope'

    can_create = True
    can_edit = True
    can_custom_export = True
    can_custom_import = True

    column_list = ('email', 'is_active', 'created_at', )
    column_labels = {'created_at': 'Date'}
    column_default_sort = ('created_at', True)

    column_details_list = ('email', 'is_active', 'created_at', 'updated_at')

    column_formatters = {
        'email': macro('column_formatters.email'),
    }

    custom_import_init = init_newsletter_subscribe_model
    custom_export_columns = ('email', 'is_active')

