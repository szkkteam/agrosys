#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_admin import Admin

# Internal package imports
from backend.contrib.admin.views import AdminDashboardView


admin = Admin(name='Flask Starter Admin',
              index_view=AdminDashboardView(),
              template_mode='bootstrap3',
              )
