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
    TimestampMixin,
    BaseModel,
    DateTime,
    Enum,
    relationship,
    foreign_key,
    association_proxy
)
from .plan_mixin import PlanMixin
from backend.security.models.resource import Resource


class Plan(PlanMixin, TimestampMixin, BaseModel):

    title = Column(String(128))

    tasks = relationship('Task', back_populates='plan',
                         cascade='all, delete-orphan')

    crop_template_id = foreign_key('CropTemplate', nullable=False)
    crop_template = relationship('CropTemplate', uselist=False)

    __repr_props__ = ('plan_id', 'title', 'use_as_template', 'crop_template_id')
