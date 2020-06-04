#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model,
)
from backend.permissions.models import GroupPermissionMixin

class GroupPermission(GroupPermissionMixin, Model):
    # TODO: Implement later
    pass