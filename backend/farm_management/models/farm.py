#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports
from flask_security import current_user

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Boolean,
    association_proxy,
    relationship,
)
from .resource import Resource

class Farm(Resource):
    __mapper_args__ = {'polymorphic_identity': 'farm'}
    name = Column(String(64))

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    fields = relationship('Field', back_populates='farm')

    __repr_props__ = ('id', 'name')
