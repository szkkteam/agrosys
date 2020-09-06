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


def create(specific_product):
    from ..models import PlanSpecificProduct
    return PlanSpecificProduct(specific_product=specific_product)


class Plan(PlanMixin, TimestampMixin, BaseModel):

    title = Column(String(128))

    tasks = relationship('Task', back_populates='plan',
                         cascade='all, delete-orphan')

    plan_specific_products = relationship('PlanSpecificProduct', back_populates='plan',
                                                cascade='all, delete-orphan')
    specific_products = association_proxy('plan_specific_products ', 'specific_product',
                                          creator=lambda specific_product: create(
                                              specific_product))

    __repr_props__ = ('plan_id', 'title', 'specific_products', )
