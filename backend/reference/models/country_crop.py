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

class CountryCrop(Model):
    title = Column(String(128))

    country_id = foreign_key('Country', nullable=False)
    country = relationship('Country')

    crop_type_id = foreign_key('CropType', nullable=False)
    crop_type = relationship('CropType')

    # TODO: Impelement versioning

    __repr_props__ = ('id', 'title', 'so_id')
