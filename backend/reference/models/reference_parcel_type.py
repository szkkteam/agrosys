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

class ReferenceParcelType(Model):
    title = Column(String(64), nullable=False)
    description = Column(String(64), nullable=True)

    __repr_props__ = ('id', 'title', 'iso')
