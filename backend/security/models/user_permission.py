#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    BaseModel,
TimestampMixin
)
from backend.permissions.models import UserPermissionMixin

class UserPermission(UserPermissionMixin, BaseModel, TimestampMixin):
    # TODO: Implement later
    pass