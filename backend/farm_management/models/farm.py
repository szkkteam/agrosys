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

class Farm(Model):
    name = Column(String(64))

    farm_users = relationship('UserFarm', back_populates='farm',
                              cascade='all, delete-orphan')
    users = association_proxy('farm_users', 'farmer',
                              creator=lambda user: FarmerFarm(user=user))

    fields = relationship('Field', back_populates='farm')

    __repr_props__ = ('id', 'name')
