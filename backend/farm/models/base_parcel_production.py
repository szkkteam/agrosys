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

class BaseParcelProduction(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    production_id = foreign_key('Production', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    production = relationship('Production', back_populates='production_base_parcels')

    base_parcel_id = foreign_key('BaseParcel', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    base_parcel = relationship('BaseParcel', back_populates='base_parcel_productions')

    __repr_props__ = ('production_id', 'base_parcel_id')

    def __init__(self, production=None, base_parcel=None, **kwargs):
        super().__init__(**kwargs)
        if base_parcel:
            self.base_parcel = base_parcel
        if production:
            self.production = production
