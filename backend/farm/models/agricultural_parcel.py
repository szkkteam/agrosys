#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    BigInteger,
    String,
    relationship,
    foreign_key,
    association_proxy
)
from .reference_parcel import ReferenceParcel
from .reference_parcel_mixin import ReferenceParcelTypes

class AgriculturalParcel(ReferenceParcel):
    __mapper_args__ = {'polymorphic_identity': ReferenceParcelTypes.AgriculturalParcel.value}

    id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    # Production relationship definition
    plan_executions = relationship('PlanExecution', cascade="all, delete", back_populates='agricultural_parcel')

    __repr_props__ = ('id', 'title', 'parcels')
