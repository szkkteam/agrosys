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


class BaseParcelStatus(enum.Enum):
    Active = 'Active'
    Archived = 'Archived'


def create_base_parcel_production(production):
    from ..models import BaseParcelProduction
    return BaseParcelProduction(production=production)


def create_base_parcel_reference_parcels(reference_parcel):
    from ..models import ReferenceParcelBaseParcel
    return ReferenceParcelBaseParcel(reference_parcel=reference_parcel)


class BaseParcel(Model):
    title = Column(String(64), nullable=True)

    geometry = Column(Geometry("POLYGON"))  # TODO: Do I need to specify the srid or not?
    status = Column(Enum(BaseParcelStatus), default=BaseParcelStatus.Active)

    area = Column(Float())

    base_parcel_reference_parcels = relationship('ReferenceParcelBaseParcel', back_populates='base_parcel',
                                            cascade='all, delete-orphan')
    reference_parcels = association_proxy('reference_parcel_base_parcels', 'reference_parcel',
                                      creator=lambda reference_parcel: create_base_parcel_reference_parcels(reference_parcel))


    base_parcel_productions = relationship('BaseParcelProduction', back_populates='base_parcel',
                                            cascade='all, delete-orphan')
    productions = association_proxy('production_base_parcels', 'production',
                                      creator=lambda production: create_base_parcel_production(production))

    __repr_props__ = ('id', 'title')
