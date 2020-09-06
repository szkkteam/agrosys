#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import current_user
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Integer,
    Float,
    Date,
    relationship,
    association_proxy,
    foreign_key
)

def create(agricultural_product):
    from ..models import AgriculturalProductFact
    return AgriculturalProductFact(agricultural_product=agricultural_product)


class Region(Model):
    title = Column(String(64))
    so_code = Column(String(4), nullable=False)

    country_id = foreign_key('Country', nullable=False)
    country = relationship('Country', back_populates='regions')

    agricultural_product_facts = relationship('AgriculturalProductFact', back_populates='region',
                                                cascade='all, delete')
    #agricultural_products = association_proxy('region_agricultural_products', 'agricultural_product',
    #                            creator=lambda agricultural_product: create(agricultural_product))

    __repr_props__ = ('id', 'title', 'so_code')
