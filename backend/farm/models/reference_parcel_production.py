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

class ReferenceParcelProduction(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    production_id = foreign_key('Production', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    production = relationship('Production', back_populates='production_reference_parcels')

    reference_parcel_id = foreign_key('ReferenceParcel', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    reference_parcel = relationship('ReferenceParcel', back_populates='reference_parcel_productions')

    __repr_props__ = ('production_id', 'reference_parcel_id')

    def __init__(self, production=None, reference_parcel=None, **kwargs):
        super().__init__(**kwargs)
        if reference_parcel:
            self.reference_parcel = reference_parcel
        if production:
            self.production = production
