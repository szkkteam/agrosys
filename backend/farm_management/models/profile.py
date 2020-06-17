#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa

# Internal package imports
from backend.database import (
    Column,
    String,
)
#from backend.security.models import User
from backend.security.models.resource import Resource

class Profile(Resource):

    __mapper_args__ = {'polymorphic_identity': 'profile'}

    display_name = Column(String(64))

    id = sa.Column(sa.Integer(),
                            sa.ForeignKey('resource.resource_id',
                                          onupdate='CASCADE',
                                          ondelete='CASCADE', ),
                            primary_key=True)


    __repr_props__ = ('display_name')

    @classmethod
    def create_default_profile(cls, user=None):
        return cls.create(
            display_name=user.username,
            commit=False
        )