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
from .farm_user_roles import FarmRole

class Farm(Model):
    name = Column(String(64))

    farm_users = relationship('FarmRole', back_populates='farm',
                              cascade='all, delete-orphan')
    users = association_proxy('farm_users', 'user',
                              creator=lambda user: FarmRole(user=user))

    fields = relationship('Field', back_populates='farm')

    __repr_props__ = ('id', 'name')
