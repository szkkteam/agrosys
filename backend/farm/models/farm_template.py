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

class FarmTemplate(BaseModel, TimestampMixin):
    """Join table between User and Role"""

    farm_id = foreign_key('Farm', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")
    template_id = foreign_key('Template', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    farm = relationship('Farm',
                        back_populates='farm_templates',
                        #backref='farm_templates',
                        foreign_keys=farm_id,
                        )

    template = relationship('Template',
                            back_populates='template_farms',
                            #backref='template_farms',
                            foreign_keys=template_id,
                            )


    __repr_props__ = ('reference_parcel_id', 'season_id')

    def __init__(self, template=None, farm=None, **kwargs):
        super().__init__(**kwargs)
        if farm:
            self.farm = farm
        if template:
            self.template = template
