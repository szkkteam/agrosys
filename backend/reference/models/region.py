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

def create(crop_types):
    from ..models import CropTypeRegion
    return CropTypeRegion(crop_types=crop_types)


class Region(Model):
    title = Column(String(64))
    so_code = Column(String(4), nullable=False)

    country_id = foreign_key('Country', nullable=False)
    country = relationship('Country', back_populates='regions')

    region_crop_types = relationship('CropTypeRegion', back_populates='region',
                                                cascade='all, delete')
    crop_types = association_proxy('crop_type_region', 'crop_type',
                                creator=lambda crop_types: create(crop_types))

    __repr_props__ = ('id', 'title', 'so_code')
