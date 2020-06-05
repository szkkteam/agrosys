#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
# Internal package imports
from backend.database import (
    Model,
)
from .resource import Resource


class Entity(Resource):
    """
    Resource of `entry` type
    """

    __tablename__ = 'entities'
    __mapper_args__ = {'polymorphic_identity': 'entity'}

    resource_id = sa.Column(sa.Integer(),
                            sa.ForeignKey('resources.resource_id',
                                          onupdate='CASCADE',
                                          ondelete='CASCADE', ),
                            primary_key=True, )
    # ... your own properties....
    some_property = sa.Column(sa.UnicodeText())