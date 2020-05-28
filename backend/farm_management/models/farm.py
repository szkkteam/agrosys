#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Boolean,
    association_proxy,
    relationship,
)
from .profile_farm import ProfileFarm

class Farm(Model):
    name = Column(String(64))

    farm_profiles = relationship('ProfileFarm', back_populates='farm',
                              cascade='all, delete-orphan')
    profiles = association_proxy('farm_profiles', 'profile',
                              creator=lambda profile: ProfileFarm(profile=profile))

    fields = relationship('Field', back_populates='farm')

    __repr_props__ = ('id', 'name')
