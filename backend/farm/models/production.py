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
    Enum,
    relationship,
    foreign_key,
    association_proxy
)
from backend.security.models.resource import Resource


class ProductionStatus(enum.Enum):
    Active = 'Active'
    Archived = 'Archived'


def create_base_parcel_production(base_parcel):
    from ..models import BaseParcelProduction
    return BaseParcelProduction(base_parcel=base_parcel)


class Production(Model):
    title = Column(String(128))
    use_as_template = Column(Boolean, default=False)
    status = Column(Enum(ProductionStatus), default=ProductionStatus.Active)

    production_base_parcels = relationship('BaseParcelProduction', back_populates='production',
                                            cascade='all, delete-orphan')
    base_parcels = association_proxy('base_parcel_productions', 'base_parcel',
                                      creator=lambda base_parcel: create_base_parcel_production(base_parcel))

    tasks = relationship('Task', back_populates='production',
                         cascade='all, delete-orphan')

    crop_template_id = foreign_key('CropTemplate', nullable=False)
    crop_template = relationship('CropTemplate', uselist=False)

    __repr_props__ = ('id', 'title', 'use_as_template', 'crop_template_id')
