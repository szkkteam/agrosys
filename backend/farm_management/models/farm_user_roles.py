#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    Boolean,
    foreign_key,
    relationship,
)

class FarmRole(Model):
    """Join table between Farm and User"""
    user_id = foreign_key('User', primary_key=True)
    user = relationship('User', back_populates='user_farms')

    farm_id = foreign_key('Farm', primary_key=True)
    farm = relationship('Farm', back_populates='farm_users')

    __repr_props__ = ('user_id', 'role_id')

    def __init__(self, user=None, farm=None, **kwargs):
        super().__init__(**kwargs)
        if user:
            self.user = user
        if farm:
            self.farm = farm