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

class FarmerFarm(BaseModel):
    """Join table between User and Role"""

    is_owner = Column(Boolean(name='owner'), default=True)
    # Field roles
    can_create_fields = Column(Boolean(), default=True)
    can_edit_fields = Column(Boolean(), default=True)
    can_delete_fields = Column(Boolean(), default=True)


    farmer_id = foreign_key('Farmer', primary_key=True, unique=True)
    farmer = relationship('Farmer', back_populates='farmer_farms')

    farm_id = foreign_key('Farm', primary_key=True, unique=True)
    farm = relationship('Farm', back_populates='farm_farmers')

    __repr_props__ = ('farmer_id', 'farm_id')

    def __init__(self, farmer=None, farm=None, **kwargs):
        super().__init__(**kwargs)
        if farmer:
            self.farmer = farmer
        if farm:
            self.farm = farm
