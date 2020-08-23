#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import enum
# Pip package imports
import sqlalchemy as sa
# Internal package imports
from backend.database import (
    Column,
    BigInteger,
    String,
    Boolean,
    Model,
    DateTime,
    Enum,
    relationship,
    foreign_key,
    association_proxy
)
from .plan import Plan


def create_parcel(reference_parcel):
    from ..models import ReferenceParcelProduction
    return ReferenceParcelProduction(reference_parcel=reference_parcel)


class Production(Plan):
    __mapper_args__ = {'polymorphic_identity': 'production'}

    id = foreign_key('Plan', fk_col='plan_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    archived_at = Column(DateTime, default=None, nullable=True)

    production_reference_parcels = relationship('ReferenceParcelProduction', back_populates='production',
                                          cascade='all, delete-orphan')
    reference_parcels = association_proxy('production_reference_parcels ', 'reference_parcel',
                                          creator=lambda reference_parcel: create_parcel(
                                              reference_parcel))

    __repr_props__ = ('id', 'title', 'plan_type', 'tasks')

