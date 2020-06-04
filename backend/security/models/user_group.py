#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model,
)
from backend.permissions.models import UserGroupMixin

class UserGroup(UserGroupMixin, Model):
    # TODO: Implement later
    pass