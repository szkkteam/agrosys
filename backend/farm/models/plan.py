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
from backend.security.models.resource import Resource

def create_base_parcel_production(reference_parcel):
    from ..models import ReferenceParcelPlan
    return ReferenceParcelPlan(reference_parcel=reference_parcel)


class Plan(Model):
    title = Column(String(128))
    use_as_template = Column(Boolean, default=False)

    plan_reference_parcels = relationship('ReferenceParcelPlan', back_populates='plan',
                                            cascade='all, delete-orphan')
    reference_parcels = association_proxy('reference_parcel_plans', 'reference_parcel',
                                      creator=lambda reference_parcel: create_base_parcel_production(reference_parcel))

    tasks = relationship('Task', back_populates='plan',
                         cascade='all, delete-orphan')

    crop_template_id = foreign_key('CropTemplate', nullable=False)
    crop_template = relationship('CropTemplate', uselist=False)

    archived_at = Column(DateTime, default=None, nullable=True)

    __repr_props__ = ('id', 'title', 'use_as_template', 'crop_template_id')
