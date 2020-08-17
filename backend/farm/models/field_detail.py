#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports
from flask_security import current_user
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    BigInteger,
    Boolean,
    association_proxy,
    relationship,
    foreign_key
)

def create_field_detail_production(production):
    from ..models import FieldDetailProduction
    return FieldDetailProduction(production=production)


class FieldDetail(Model):

    area = Column(Float())
    value = Column(Float(), nullable=True)
    shape = Column(Geometry("POLYGON")) # TODO: Do I need to specify the srid or not?
    #shape = Column(Geometry("POLYGON", srid=900913))

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', uselist=False)

    # Field relationship
    field_id = sa.Column(BigInteger,
              sa.ForeignKey('field.id',
                            ondelete='CASCADE',),
              nullable=False, )
    #field_id = foreign_key('Field', nullable=False)
    field = relationship('Field', back_populates='field_details')

    # Production relationship
    field_detail_productions = relationship('FieldDetailProduction', back_populates='field_detail',
                                 cascade='all, delete')
    productions = association_proxy('field_detail_productions', 'production',
                              creator=lambda production: create_field_detail_production(production))


    __repr_props__ = ('id', 'value', 'area', 'soil_type_id', 'field_id', 'soil_type', 'field_id')
