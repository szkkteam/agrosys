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
    Boolean,
    relationship,
    foreign_key,
    association_proxy
)
from backend.security.models.resource import Resource
from backend.crop.models import CropTemplate

def create_field_detail_production(field_detail):
    from .field_detail_production import FieldDetailProduction
    return FieldDetailProduction(field_detail=field_detail)


class Production(Resource):
    __mapper_args__ = {'polymorphic_identity': 'production'}

    title = Column(String(128))
    use_as_template = Column(Boolean, default=False)

    id = sa.Column(BigInteger,
                   sa.ForeignKey('resource.resource_id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )


    # Field relationship
    production_field_details = relationship('FieldDetailProduction', back_populates='production',
                                            cascade='all, delete-orphan')
    field_details = association_proxy('field_detail_productions', 'field_detail',
                               creator=lambda field_detail: create_field_detail_production(field_detail))

    tasks = relationship('Task', back_populates='production')

    crop_template_id = foreign_key('CropTemplate', nullable=False)
    crop_template = relationship('CropTemplate', uselist=False)

    __repr_props__ = ('id', 'title', 'use_as_template', 'crop_template_id')
