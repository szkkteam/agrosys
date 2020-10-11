#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    DateTime,
    BigInteger,
    Boolean,
    Enum,
    association_proxy,
    relationship,
    foreign_key
)


class Season(Model):
    title = Column(String(64), nullable=True)

    start_date = Column(DateTime(timezone=False))
    end_date = Column(DateTime(timezone=False))

    farm_id = foreign_key('Farm', nullable=False, ondelete='CASCADE',)
    farm = relationship('Farm', back_populates='seasons')

    reference_parcels = relationship('ReferenceParcel', back_populates='season',
                         cascade='all, delete-orphan')

    archived_at = Column(DateTime, default=None, nullable=True)

    __repr_props__ = ('id', 'title')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.id == id)