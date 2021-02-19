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
    foreign_key,
    relationship,
    association_proxy
)
from backend.security.models.resource import Resource

class Farm(Resource):
    __mapper_args__ = {'polymorphic_identity': 'farm'}

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.resource_id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    title = Column(String(64))

    region_id = foreign_key('Region', nullable=False, ondelete='CASCADE',)
    region = relationship('Region', uselist=False)

    seasons = relationship('Season', cascade="all, delete", back_populates='farm')
    # TODO: Define later lazy relationship

    __repr_props__ = ('id', 'title', 'owner_user_id', 'templates')

    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        return Farm.get(id)