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

class ReferenceParcelBaseParcel(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    reference_parcel_id = foreign_key('ReferenceParcel', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    reference_parcel = relationship('ReferenceParcel', back_populates='reference_parcel_base_parcels')

    base_parcel_id = foreign_key('BaseParcel', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    base_parcel = relationship('BaseParcel', back_populates='base_parcel_reference_parcels')

    __repr_props__ = ('reference_parcel_id', 'base_parcel_id')

    def __init__(self, reference_parcel=None, base_parcel=None, **kwargs):
        super().__init__(**kwargs)
        if base_parcel:
            self.base_parcel = base_parcel
        if reference_parcel:
            self.reference_parcel = reference_parcel
