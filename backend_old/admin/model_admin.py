#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from datetime import date, datetime

# Pip package imports
from flask import redirect, request, flash

from flask_admin.contrib.sqla import ModelView as BaseModelView
from flask_admin.consts import ICON_TYPE_GLYPH
from flask_admin.base import expose
from flask_admin.helpers import get_redirect_target

import pyexcel as pe

from loguru import logger

# Internal package imports
from backend.extensions import db

from .form import ReorderableForm, CustomAdminConverter, CustomExportForm, CustomImportForm
from .macro import macro
from .security import AdminSecurityMixin


EXTEND_BASE_CLASS_ATTRIBUTES = (
    'column_formatters',
    'column_type_formatters',
)

class ModelAdmin(AdminSecurityMixin, BaseModelView):
    can_view_details = True

    menu_icon_type = ICON_TYPE_GLYPH
    menu_icon_value = None

    create_template = 'admin/model/base_create.html'
    details_template = 'admin/model/base_details.html'
    edit_template = 'admin/model/base_edit.html'
    list_template = 'admin/model/base_list.html'

    custom_import_template = 'admin/model/custom_import.html'
    custom_export_template = 'admin/model/custom_export.html'

    column_exclude_list = ('created_at', 'updated_at')
    form_excluded_columns = ('created_at', 'updated_at')

    column_type_formatters = {
        datetime: lambda view, dt: dt.strftime('%-m/%-d/%Y %-I:%M %p %Z'),
        date: lambda view, d: d.strftime('%-m/%-d/%Y'),
    }

    column_formatters = {
        'created_at': macro('column_formatters.datetime'),
        'updated_at': macro('column_formatters.datetime'),
    }

    form_base_class = ReorderableForm
    model_form_converter = CustomAdminConverter

    def __getattribute__(self, item):
        """Allow class attribute names in EXTEND_BASE_CLASS_ATTRIBUTES that are
        defined on subclasses to automatically extend the equivalently named
        attribute on this base class

        (a bit of an ugly hack, but hey, it's only the admin)
        """
        value = super().__getattribute__(item)
        if item in EXTEND_BASE_CLASS_ATTRIBUTES and value is not None:
            base_value = getattr(ModelAdmin, item)
            base_value.update(value)
            return base_value
        return value

    @expose('/import/', methods=('GET', 'POST'))
    def custom_import_view(self):
        """
            Custom import view
        """
        from sqlalchemy.exc import IntegrityError

        return_url = get_redirect_target() or self.get_url('.index_view')

        if not self.can_custom_import:
            return redirect(return_url)

        form = CustomImportForm()
        if form.validate_on_submit():
            try:
                # Read the FileStorage object's binary stream and convert it to strings
                data = form.file.data.read().decode('utf-8')
                # Create an in-memory CSV object for pyexcel webio
                sheet = pe.Sheet()
                sheet.csv = data
                sheet.name_columns_by_row(0)
                # Extract the parameters if more initializer was given
                params = {}
                if hasattr(self, 'custom_import_init'):
                    if isinstance(self.custom_import_init, list):
                        params['initializers'] = self.custom_import_init
                        params['tables'] = self.model_list
                    else:
                        params['initializer'] = self.custom_import_init
                        params['table'] = self.model
                else:
                    params['initializer'] = lambda _, row: self.model.__call__(**row)

                try:
                    sheet.save_to_database(session=db.session,
                                           auto_commit=True,
                                           **params)
                except IntegrityError as i_err:
                    # Integrity error
                    logger.error(i_err)
                    flash('Integrity error: %s' % i_err, 'error')
                except Exception as err:
                    # Other errors
                    logger.error(err)
                    flash('Unknown error: %s' % err, 'error')
            except Exception as err:
                # File read error
                logger.error(err)
                flash('File read error: %s' % err, 'error')

            return redirect(self.get_save_return_url(self.model, is_created=True))

        if self.create_modal and request.args.get('modal'):
            template = self.custom_import_modal_template
        else:
            template = self.custom_import_template

        return self.render(template,
                           form=form,
                           form_opts=None,
                           return_url=return_url)

    @expose('/export/', methods=('GET', 'POST'))
    def custom_export_view(self):
        """
            Custom Export view
        """
        return_url = get_redirect_target() or self.get_url('.index_view')

        if not self.can_custom_export:
            return redirect(return_url)

        # TODO: Test auto fill form value
        """        
        # It is neccesserry to only fill the form value when the form is requested NOT posted
        if request.method == 'GET':
            form = NewForm(formdata=MultiDict({'name': 'foo'}))
        else:
            form = NewForm()
        """

        form = CustomExportForm()
        if form.validate_on_submit():
            filename = form.file_name.data if form.file_name.data != "" else "export_data"
            cols = self.custom_export_columns if hasattr(self, 'custom_export_columns') else self.column_list

            try:
                query_sets = self.model.all()
                file_stream = pe.save_as(query_sets=query_sets, column_names=list(cols),
                                         dest_file_type="csv")
                return (
                    file_stream.read(),
                    200,
                    {
                        'Content-Type': 'application/csv',
                        'Pragma': 'no-cache',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Expires': '0',
                        'Content-Disposition': 'attachment; filename="%s.csv"' % filename
                    }
                )
            except Exception as err:
                # Other errors
                logger.error(err)
                flash('Unknown error: %s' % err, 'error')

            return redirect(self.get_save_return_url(self.model, is_created=True))

        if self.create_modal and request.args.get('modal'):
            template = self.custom_export_modal_template
        else:
            template = self.custom_export_template

        return self.render(template,
                           form=form,
                           form_opts=None,
                           return_url=return_url)
