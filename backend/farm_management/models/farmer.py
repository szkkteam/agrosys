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
    association_proxy,
    relationship,
    foreign_key
)
from .farmer_farm import FarmerFarm
from .farm import Farm

class Farmer(Model):

    is_owner = Column(Boolean(name='owner'), default=True)

    user_id = foreign_key('User', nullable=False)
    user = relationship('User', uselist=False, back_populates='farmers')

    farmer_farms = relationship('FarmerFarm', back_populates='farmer',
                                 cascade='all, delete-orphan')
    farms = association_proxy('farmer_farms', 'farm',
                              creator=lambda farm: FarmerFarm(farm=farm))

    __repr_props__ = ('id', 'user_id')

    @classmethod
    def get_or_create_owner(cls, user=None):
        instance = cls.get_or_create(is_owner=True, commit=False)
        if not instance.user and user:
            instance.user = user
            #instance.save(True)
        return instance
