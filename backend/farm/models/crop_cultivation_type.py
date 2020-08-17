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

class CropCultivationType(Model):
    title = Column(String(64), nullable=False)
    description = Column(String(256), nullable=True)
    yield_modifier = Column(Float())

    crop_templates = relationship('CropTemplate', back_populates='crop_cultivation_type')

    __repr_props__ = ('id', 'title', 'yield_modifier')
