#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa

# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    TimestampMixin,
    String,
    Float,
    BigInteger,
    foreign_key,
    relationship,
)

class PlanSpecificProduct(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    plan_id = foreign_key('Plan', fk_col='plan_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    plan = relationship('Plan', back_populates='plan_specific_products')

    specific_product_id = foreign_key('SpecificProduct', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    specific_product = relationship('SpecificProduct', back_populates='specific_product_plans')

    __repr_props__ = ('plan_id', 'specific_product_id')

    def __init__(self, plan=None, specific_product=None, **kwargs):
        super().__init__(**kwargs)
        if specific_product:
            self.specific_product = specific_product
        if plan:
            self.plan = plan
