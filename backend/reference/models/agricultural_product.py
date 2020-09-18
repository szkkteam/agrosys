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

def create(region):
    from ..models import AgriculturalProductFact
    return AgriculturalProductFact(region=region)

class AgriculturalProduct(Model):
    title = Column(String(128))
    so_id = Column(String(16), nullable=False)
    so_unit = Column(String(16), nullable=False)

    agricultural_product_facts = relationship('AgriculturalProductFact', back_populates='agricultural_product',
                                            cascade='all, delete')

    #regions = association_proxy('agricultural_product_regions', 'region',
    #                                      creator=lambda region: create(region))

    __repr_props__ = ('id', 'title', 'so_id')
