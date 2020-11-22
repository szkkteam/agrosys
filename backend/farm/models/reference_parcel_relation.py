#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
from sqlalchemy.orm import backref

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
    parcel_id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE")

    __repr_props__ = ('block_id', 'parcel_id')

    def __init__(self, block=None, parcel=None, **kwargs):
        print("Adding relation - Block: %s Parcel: %s" % (block, parcel))
        super().__init__(**kwargs)
        if parcel:
            self.parcel = parcel
        if block:
            self.block = block
