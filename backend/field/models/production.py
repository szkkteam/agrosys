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


def create_field_production(field):
    from .field_production import FieldProduction
    return FieldProduction(field=field)


class Production(Model):
    title = Column(String(64), nullable=False)
    # TODO: Maybe this is not needed
    # crop_template_id =

    # Field relationship
    production_fields = relationship('FieldProduction', back_populates='production',
                                 cascade='all, delete-orphan')
    fields = association_proxy('field_productions', 'field',
                              creator=lambda field: create_field_production(field))


    __repr_props__ = ('title')
