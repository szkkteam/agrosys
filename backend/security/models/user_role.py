#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Model,
    foreign_key,
    relationship,
)

class UserRole(Model):
    """Join table between User and Role"""

    def __init__(self, user=None, role=None, **kwargs):
        super().__init__(**kwargs)
        if user:
            self.user = user
        if role:
            self.role = role