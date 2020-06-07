#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model,
)
from backend.permissions.models import GroupMixin

class Group(GroupMixin, Model):
    __possible_permissions__ = (
        "root_administration",
        "administration",
        "backend_admin_panel",
        "manage_apps",
    )
    # TODO: Implement later
    pass