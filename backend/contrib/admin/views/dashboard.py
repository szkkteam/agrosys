#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_admin import AdminIndexView as BaseAdminIndexView, expose

# Internal package imports
from ..security import AdminSecurityMixin


class AdminDashboardView(AdminSecurityMixin, BaseAdminIndexView):
    @expose('/')
    def index(self):
        return self.render('admin/dashboard.html')
