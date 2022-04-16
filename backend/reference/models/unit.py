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

class Unit(Model):
    title = Column(String(64))
    so_unit = Column(String(16), nullable=True)

    __repr_props__ = ('id', 'title')
