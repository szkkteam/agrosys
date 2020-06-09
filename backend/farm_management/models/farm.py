#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
from flask_security import current_user

# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    String,
    relationship
)
from backend.security.models.resource import Resource

class Farm(Resource):
    __mapper_args__ = {'polymorphic_identity': 'farm'}
    name = Column(String(64))

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    seasons = relationship('Season', cascade="all,delete", back_populates='farm')
    # TODO: Define later lazy relationship
    #seasons = relationship('Season', cascade="all,delete", back_populates='farm', lazy='noload')

    __repr_props__ = ('id', 'name', 'owner_user_id')
