#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    Boolean,
    relationship,
    foreign_key
)
from .farm import Farm

class Field(Model):
    name = Column(String(64))
    value = Column(Float(), nullable=True)
    shape = Column(Geometry("POLYGON"))

    farm_id = foreign_key('Farm', nullable=False)
    farm = relationship('Farm', back_populates='fields')

    # TODO: GeoJSON coordinates

    __repr_props__ = ('id', 'name', 'value')
