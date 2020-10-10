#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa

# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    TimestampMixin,
    String,
    Float,
    BigInteger,
    foreign_key,
    relationship,
)

class CropTypeRegion(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    crop_type_id = foreign_key('CropType', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    crop_type = relationship('CropType', back_populates='crop_type_regions')

    region_id = foreign_key('Region', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    region = relationship('Region', back_populates='region_crop_types')

    __repr_props__ = ('crop_type_id', 'region_id')

    def __init__(self, crop_types=None, region=None, **kwargs):
        super().__init__(**kwargs)
        if region:
            self.region = region
        if crop_types:
            self.crop_types = crop_types
