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

class SeasonReferenceParcel(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    season_id = foreign_key('Season', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    season = relationship('Season', back_populates='season_reference_parcels')

    reference_parcel_id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    reference_parcel = relationship('ReferenceParcel', back_populates='reference_parcel_seasons')


    __repr_props__ = ('reference_parcel_id', 'season_id')

    def __init__(self, reference_parcel=None, season=None, **kwargs):
        super().__init__(**kwargs)
        if season:
            self.season = season
        if reference_parcel:
            self.reference_parcel = reference_parcel
