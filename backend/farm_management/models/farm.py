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
from .farmer_farm import FarmerFarm

class Farm(Model):
    name = Column(String(64))

    farm_farmers = relationship('FarmerFarm', back_populates='farm',
                              cascade='all, delete-orphan')
    farmers = association_proxy('farm_farmers', 'farmer',
                              creator=lambda farmer: FarmerFarm(farmer=farmer))

    fields = relationship('Field', back_populates='farm')

    __repr_props__ = ('id', 'name')
