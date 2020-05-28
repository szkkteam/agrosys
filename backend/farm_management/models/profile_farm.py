#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    String,
    Float,
    Boolean,
    foreign_key,
    relationship,
)

class ProfileFarm(BaseModel):
    """Join table between User and Role"""
    # TODO: Define user rules for that farm

    profile_id = foreign_key('Profile', primary_key=True, unique=True)
    profile = relationship('Profile', back_populates='profile_farms')

    farm_id = foreign_key('Farm', primary_key=True, unique=True)
    farm = relationship('Farm', back_populates='farm_profiles')

    __repr_props__ = ('profile_id', 'farm_id')

    def __init__(self, profile=None, farm=None, **kwargs):
        super().__init__(**kwargs)
        if profile:
            self.user = profile
        if farm:
            self.farm = farm