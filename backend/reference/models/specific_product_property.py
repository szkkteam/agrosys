#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import current_user
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    ProxiedDictMixin,
    String,
    Integer,
    Float,
    Date,
    Unicode,
    relationship,
    association_proxy,
    foreign_key
)

class SpecificProductProperty(BaseModel):

    specific_product_id = foreign_key('SpecificProduct', primary_key=True)
    key = Column(Unicode(64), primary_key=True)
    value = Column(String(128))

    __repr_props__ = ('key', 'value', )
