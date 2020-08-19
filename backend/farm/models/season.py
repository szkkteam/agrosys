#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    DateTime,
    BigInteger,
    Boolean,
    Enum,
    association_proxy,
    relationship,
    foreign_key
)

def create(reference_parcel):
    from ..models import SeasonReferenceParcel
    return SeasonReferenceParcel(reference_parcel=reference_parcel)

class Season(Model):
    title = Column(String(64), nullable=True)

    farm_id = foreign_key('Farm', nullable=False, ondelete='CASCADE',)
    farm = relationship('Farm', back_populates='seasons')

    season_reference_parcels = relationship('SeasonReferenceParcel', back_populates='season',
                                 cascade='all, delete')
    reference_parcels = association_proxy('season_reference_parcels', 'reference_parcel',
                              creator=lambda reference_parcel: create(reference_parcel))

    archived_at = Column(DateTime, default=None, nullable=True)

    __repr_props__ = ('id', 'title')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.id == id)