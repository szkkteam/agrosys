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
    Float,
    Boolean,
    association_proxy,
    relationship,
    foreign_key
)

class FieldData(Model):

    season_field = relationship('SeasonField', uselist=False, back_populates='field_data')

    value = Column(Float(), nullable=True)
    shape = Column(Geometry("POLYGON", srid=900913))


    __repr_props__ = ('id', 'value')
