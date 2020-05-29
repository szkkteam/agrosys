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
    association_proxy,
    relationship,
    foreign_key
)
from .farmer_farm import FarmerFarm
from .farm import Farm

class Farmer(Model):

    user_id = foreign_key('User', nullable=False)
    users = relationship('User', back_populates='farmers')

    farmer_farms = relationship('FarmerFarm', back_populates='farmer',
                                 cascade='all, delete-orphan')
    farms = association_proxy('farmer_farms', 'farm',
                              creator=lambda farm: FarmerFarm(farm=farm))

    __repr_props__ = ('id', 'user_id')
