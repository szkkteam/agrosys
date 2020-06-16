#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    String,
    relationship,
    foreign_key,
    association_proxy
)
from backend.security.models.resource import Resource


def create_field_production(production):
    from .field_production import FieldProduction
    return FieldProduction(production=production)


class Field(Resource):
    __mapper_args__ = {'polymorphic_identity': 'field'}
    title = Column(String(64))

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    # Farm relationship
    farm_id = foreign_key('Farm', nullable=False)
    farm = relationship('Farm', back_populates='fields', foreign_keys=[farm_id])

    # Field relationship
    field_details = relationship('FieldDetail', cascade="all,delete", back_populates='field')



    # Production relationship
    field_productions = relationship('FieldProduction', back_populates='field',
                                 cascade='all, delete-orphan')
    productions = association_proxy('field_productions', 'field',
                              creator=lambda production: create_field_production(production))

    # TODO: Define later lazy relationship
    #seasons = relationship('Season', cascade="all,delete", back_populates='farm', lazy='noload')

    __repr_props__ = ('id', 'title', 'owner_user_id')
