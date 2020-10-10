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

class ReferenceParcelRelation(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    block_id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    parcel_id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    #group_id = foreign_key('ReferenceParcel', primary_key=True)
    #parcel_id = foreign_key('ReferenceParcel', primary_key=True)

    block = relationship('ReferenceParcel',
                         #primaryjoin="ReferenceParcelRelation.group_id == reference_parcel.c.id",
                         backref='block_parcels',
                         foreign_keys=parcel_id,
                         cascade="all, delete"
                         )

    parcel = relationship('ReferenceParcel',
                          #primaryjoin="ReferenceParcelRelation.parcel_id == reference_parcel.c.id",
                          backref='parcel_blocks',
                          foreign_keys=block_id,
                          cascade="all, delete"
                          )

    __repr_props__ = ('block_id', 'parcel_id')

    def __init__(self, group=None, parcel=None, **kwargs):
        super().__init__(**kwargs)
        if parcel:
            self.parcel = parcel
        if group:
            self.group = group
