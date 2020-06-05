#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    BaseModel,
)
from backend.permissions.models import GroupResourcePermissionMixin

class GroupResourcePermission(GroupResourcePermissionMixin, BaseModel):
    # TODO: Implement later
    pass