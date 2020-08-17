#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
import enum

# Pip package imports
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    BigInteger,
    Boolean,
    Enum,
    association_proxy,
    relationship,
    foreign_key
)

def create_reference_parcel_base_parcel(base_parcel):
    from ..models import ReferenceParcelBaseParcel
    return ReferenceParcelBaseParcel(base_parcel=base_parcel)


class ReferenceParcelStatus(enum.Enum):
    Active = 'Active'
    Archived = 'Archived'

class ReferenceParcel(Model):
    title = Column(String(64), nullable=False)
    notes = Column(String(256), nullable=True)

    geometry = Column(Geometry("POLYGON"))  # TODO: Do I need to specify the srid or not?
    status = Column(Enum(ReferenceParcelStatus), default=ReferenceParcelStatus.Active)

    total_area = Column(Float(), nullable=False)
    eligible_area = Column(Float(), nullable=False)

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', uselist=False)

    farm_id = foreign_key('Farm', nullable=False, ondelete='CASCADE',)
    farm = relationship('Farm', back_populates='reference_parcels')

    reference_parcel_base_parcels = relationship('ReferenceParcelBaseParcel', back_populates='reference_parcel',
                                 cascade='all, delete')
    base_parcels = association_proxy('reference_parcel_base_parcels', 'base_parcel',
                              creator=lambda base_parcel: create_reference_parcel_base_parcel(base_parcel))


    __repr_props__ = ('id', 'title')
