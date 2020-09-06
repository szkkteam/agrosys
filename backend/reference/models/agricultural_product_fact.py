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

class AgriculturalProductFact(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    agricultural_product_id = foreign_key('AgriculturalProduct', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    agricultural_product = relationship('AgriculturalProduct', back_populates='agricultural_product_facts')

    region_id = foreign_key('Region', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    region = relationship('Region', back_populates='agricultural_product_facts')

    specific_product_id = foreign_key('SpecificProduct', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    specific_product = relationship('SpecificProduct', back_populates='agricultural_product_facts')

    value = Column(Float())

    __repr_props__ = ('agricultural_product_id', 'region_id', 'specific_product_id', 'value')

    def __init__(self, agricultural_product=None, region=None, specific_product=None, **kwargs):
        super().__init__(**kwargs)
        if region:
            self.region = region
        if agricultural_product:
            self.agricultural_product = agricultural_product
        if specific_product:
            self.specific_product = specific_product
