#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
import enum

# Pip package imports
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    String,
    Float,
    BigInteger,
    Boolean,
    Enum,
    Model,
    association_proxy,
    relationship,
    foreign_key
)
from .reference_parcel_relation import ReferenceParcelRelation

def create_season(season):
    from ..models import SeasonReferenceParcel
    return SeasonReferenceParcel(season=season)

def create_production(production):
    from ..models import ReferenceParcelProduction
    return ReferenceParcelProduction(production=production)

class ReferenceParcel(Model):
    #id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String(64), nullable=True)
    notes = Column(String(256), nullable=True)

    geometry = Column(Geometry("POLYGON"))  # TODO: Do I need to specify the srid or not?

    total_area = Column(Float(), nullable=False)
    eligible_area = Column(Float(), nullable=False)

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', uselist=False)

    # Self ancestor relation
    ancestor_id = sa.Column(
            sa.Integer(),
            sa.ForeignKey(
                "reference_parcel.id", onupdate="CASCADE", ondelete="CASCADE"
            ))

    # Reference Parcel Type relationship definition
    reference_parcel_type_id = foreign_key('ReferenceParcelType', nullable=False)
    reference_parcel_type = relationship('ReferenceParcelType', uselist=False)

    # Season relationship definition
    reference_parcel_seasons = relationship('SeasonReferenceParcel', back_populates='reference_parcel',
                                 cascade='all, delete')
    seasons = association_proxy('season_reference_parcels', 'season',
                              creator=lambda season: create_season(season))

    # Group relationship definition
    groups = association_proxy('group_parcels', 'group',)

    # Parcel relationship definition
    parcels_add = association_proxy('parcel_groups', 'parcel',)

    @property
    def parcels(self):
        return self.join(ReferenceParcelRelation, (ReferenceParcelRelation.parcel_id == ReferenceParcel.id)).filter(
            ReferenceParcelRelation.group_id == self.id).all()
        #return session.query(Node).join(NodeRelation, (NodeRelation.child_id == Node.id)).filter(
            #NodeRelation.parent_id == self.id).all()

    # Production relationship definition
    reference_parcel_productions = relationship('ReferenceParcelProduction', back_populates='reference_parcel',
                                            cascade='all, delete-orphan')
    productions = association_proxy('reference_parcel_productions', 'production',
                                      creator=lambda production: create_production(production))

    __repr_props__ = ('id', 'title', 'parcels')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.id == id)