#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import current_user
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Integer,
    Float,
    Date,
    relationship,
    association_proxy,
    foreign_key
)

class SoilType(Model):
    title = Column(String(64), nullable=False)
    yield_modifier = Column(Float())

    __repr_props__ = ('id', 'title', 'yield_modifier')
