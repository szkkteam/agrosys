#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    BigInteger,
    String,
    relationship,
    foreign_key,
    association_proxy
)
from backend.security.models.resource import Resource
from backend.farm_management.models import Farm


def create_field_production(production):
    from .field_production import FieldProduction
    return FieldProduction(production=production)


class Field(Resource):
    __mapper_args__ = {'polymorphic_identity': 'field'}
    title = Column(String(64))

    id = sa.Column(BigInteger,
                   sa.ForeignKey('resource.resource_id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    # Farm relationship
    farm_id = sa.Column(BigInteger,
              sa.ForeignKey('farm.id',
                            ondelete='CASCADE',),
              nullable=False, )
    #farm_id = foreign_key('Farm', nullable=False, ondelete='CASCADE')
    farm = relationship('Farm', back_populates='fields', foreign_keys=farm_id)

    # Field relationship
    field_details = relationship('FieldDetail', cascade="all, delete-orphan", back_populates='field')



    # Production relationship
    field_productions = relationship('FieldProduction', back_populates='field',
                                 cascade='all, delete-orphan')
    productions = association_proxy('field_productions', 'field',
                              creator=lambda production: create_field_production(production))

    # TODO: Define later lazy relationship
    #seasons = relationship('Season', cascade="all,delete", back_populates='farm', lazy='noload')

    __repr_props__ = ('id', 'title', 'owner_user_id', 'field_details', 'farm_id')

    def __init__(self, field_details=None, *args, **kwargs):
        super(Field, self).__init__(*args, **kwargs)
        field_details = field_details or []
        for field_detail in field_details:
            self.field_details.append(field_detail)