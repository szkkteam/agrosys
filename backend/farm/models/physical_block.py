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
    Float,
    association_proxy
)
from .reference_parcel import ReferenceParcel
from .reference_parcel_mixin import ReferenceParcelTypes

class PhysicalBlock(ReferenceParcel):
    __mapper_args__ = {'polymorphic_identity': ReferenceParcelTypes.PhysicalBlock.value}

    id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    eligible_area = Column(Float(), nullable=False)

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', uselist=False)

    # Reference Parcel Type relationship definition
    agricultural_type_id = foreign_key('AgriculturalType', nullable=False)
    agricultural_type = relationship('AgriculturalType', uselist=False)

    __repr_props__ = ('id', 'title', 'parcels')
