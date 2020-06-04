#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model,
)
from backend.permissions.models import GroupResourcePermissionMixin

class GroupResourcePermission(GroupResourcePermissionMixin, Model):
    # TODO: Implement later
    pass