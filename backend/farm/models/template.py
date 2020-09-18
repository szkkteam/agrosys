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


def create_farm(farm):
    from ..models import FarmTemplate
    return FarmTemplate(farm=farm)

class Template(Plan):
    __mapper_args__ = {'polymorphic_identity': 'template'}

    id = foreign_key('Plan', fk_col='plan_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    template_farms = relationship('FarmTemplate', back_populates='template',
                                                cascade='all, delete-orphan')
    farms = association_proxy('template_farms', 'farm',
                                creator=lambda farm: create_farm(farm))

    __repr_props__ = ('id', 'title', 'plan_type', 'specific_products')

