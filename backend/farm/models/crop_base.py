#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
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
from backend.reference.models import Unit

class CropBase(Model):
    title = Column(String(64), nullable=False)
    description = Column(String(256), nullable=True)
    base_yield = Column(Float())

    #field_details = relationship('FieldDetail', back_populates='soil_type')
    unit_id = foreign_key('Unit', nullable=False)
    unit = relationship('Unit', uselist=False)

    crop_templates = relationship('CropTemplate', back_populates='crop_base')

    __repr_props__ = ('id', 'title', 'base_yield')
