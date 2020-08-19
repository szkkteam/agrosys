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
    Model,
    String,
    Float,
    BigInteger,
    Boolean,
    Enum,
    association_proxy,
    relationship,
    foreign_key
)
from .reference_parcel_relation import ReferenceParcelRelation

def create_season(season):
    from ..models import SeasonReferenceParcel
    return SeasonReferenceParcel(season=season)

def create_plan(plan):
    from ..models import ReferenceParcelPlan
    return ReferenceParcelPlan(plan=plan)

class ReferenceParcel(Model):
    title = Column(String(64), nullable=True)
    notes = Column(String(256), nullable=True)

    geometry = Column(Geometry("POLYGON"))  # TODO: Do I need to specify the srid or not?

    total_area = Column(Float(), nullable=False)
    eligible_area = Column(Float(), nullable=False)

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', uselist=False)
    
    # Reference Parcel Type relationship definition
    reference_parcel_type_id = foreign_key('ReferenceParcelType', nullable=False)
    reference_parcel_type = relationship('ReferenceParcelType', uselist=False)

    # Season relationship definition
    reference_parcel_seasons = relationship('SeasonReferenceParcel', back_populates='reference_parcel',
                                 cascade='all, delete')
    seasons = association_proxy('season_reference_parcels', 'season',
                              creator=lambda season: create_season(season))

    # Group relationship definition
    group_parcels = relationship('ReferenceParcelRelation', back_populates='group',
                                 cascade='all, delete', foreign_keys=ReferenceParcelRelation.group_id)
    parcels = association_proxy('parcel_groups', 'parcel',
                              creator=lambda parcel: ReferenceParcelRelation(parcel=parcel))

    # Parcel relationship definition
    parcel_groups = relationship('ReferenceParcelRelation', back_populates='parcel',
                                 cascade='all, delete', foreign_keys=ReferenceParcelRelation.parcel_id)
    groups = association_proxy('group_parcels', 'group',
                              creator=lambda group: ReferenceParcelRelation(group=group))

    # Production relationship definition
    reference_parcel_plans = relationship('ReferenceParcelPlan', back_populates='reference_parcel',
                                            cascade='all, delete-orphan')
    plans = association_proxy('production_reference_parcels', 'plan',
                                      creator=lambda plan: create_plan(plan))

    __repr_props__ = ('id', 'title')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.id == id)