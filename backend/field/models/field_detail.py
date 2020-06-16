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

class FieldDetail(Model):

    area = Column(Float())
    value = Column(Float(), nullable=True)
    shape = Column(Geometry("POLYGON", srid=900913))

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', back_populates='field_details')

    # Field relationship
    field_id = foreign_key('Field', nullable=False)
    field = relationship('Field', back_populates='field_details')





    __repr_props__ = ('id', 'value')
