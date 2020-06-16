#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    String,
    Float,
    Boolean,
    foreign_key,
    relationship,
)

class FieldProduction(BaseModel):
    """Join table between User and Role"""

    field_id = foreign_key('Field', primary_key=True)
    field = relationship('Field', back_populates='field_productions')

    production_id = foreign_key('Production', primary_key=True)
    production = relationship('Production', back_populates='production_fields')

    __repr_props__ = ('field_id', 'production_id')

    def __init__(self, field=None, production=None, **kwargs):
        super().__init__(**kwargs)
        if production:
            self.production = production
        if field:
            self.field = field
