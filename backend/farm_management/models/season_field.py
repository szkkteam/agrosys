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

class SeasonField(BaseModel):
    """Join table between User and Role"""

    season_id = foreign_key('Season', primary_key=True)
    season = relationship('Season', back_populates='season_fields')

    field_id = foreign_key('Field', primary_key=True)
    field = relationship('Field', back_populates='field_seasons')

    field_data_id = foreign_key('FieldData')
    field_data = relationship('FieldData', back_populates='season_field',
                        cascade='all, delete-orphan', single_parent=True, lazy='joined')

    __repr_props__ = ('season_id', 'field_id')

    def __init__(self, season=None, field=None, **kwargs):
        super().__init__(**kwargs)
        if season:
            self.season = season
        if field:
            self.field = field
