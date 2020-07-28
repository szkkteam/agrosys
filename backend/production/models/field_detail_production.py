#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    TimestampMixin,
    String,
    Float,
    Boolean,
    foreign_key,
    relationship,
)
from backend.field.models import FieldDetail

class FieldDetailProduction(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    field_detail_id = foreign_key('FieldDetail', primary_key=True)
    field_detail = relationship('FieldDetail', back_populates='field_detail_productions')

    production_id = foreign_key('Production', primary_key=True)
    production = relationship('Production', back_populates='production_field_details')

    __repr_props__ = ('field_detail_id', 'production_id')

    def __init__(self, field_detail=None, production=None, **kwargs):
        super().__init__(**kwargs)
        if production:
            self.production = production
        if field_detail:
            self.field_detail = field_detail
