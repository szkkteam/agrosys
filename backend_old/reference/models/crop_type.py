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

def create(region):
    from ..models import CropTypeRegion
    return CropTypeRegion(crop_types=region)

class CropType(Model):
    title = Column(String(128))
    botanical_title = Column(String(128))
    so_id = Column(String(16))
    icc_id = Column(Integer(), nullable=True)
    #so_unit = Column(String(16), nullable=False)

    unit_id = foreign_key('Unit', nullable=False)
    unit = relationship('Unit')

    country_crops = relationship('CountryCrop', back_populates='crop_type')

    crop_type_regions = relationship('CropTypeRegion', back_populates='crop_type',
                                     cascade='all, delete')
    regions = association_proxy('crop_type_region', 'region',
                                   creator=lambda region: create(region))

    __repr_props__ = ('id', 'title', 'so_id')
