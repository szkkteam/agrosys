#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from sqlalchemy.orm.collections import attribute_mapped_collection
import sqlalchemy as sa

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
    TimestampMixin,
    BaseModel,
    association_proxy,
    relationship,
    foreign_key
)
from .reference_parcel_relation import ReferenceParcelRelation
from .reference_parcel_mixin import ReferenceParcelMixin



class ReferenceParcel(ReferenceParcelMixin, TimestampMixin, BaseModel):
    #id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String(64), nullable=True)
    notes = Column(String(256), nullable=True)

    geometry = Column(Geometry("POLYGON"))  # TODO: Do I need to specify the srid or not?

    total_area = Column(Float(), nullable=False)

    # Ancestor - Descendant
    # TODO: Fix this
    """
    ancestor_id = foreign_key('ReferenceParcel', fk_col='parcel_id')
    ancestor = relationship("ReferenceParcel",
                            backref='descendant',
                            remote_side=[ReferenceParcelMixin.parcel_id],
                            primaryjoin=('reference_parcel.c.parcel_id==reference_parcel.c.ancestor_id'))
    """


    # Season relationship definition
    season_id = foreign_key('Season', nullable=True, onupdate="CASCADE", ondelete="CASCADE")
    season = relationship('Season', back_populates='reference_parcels')

    # Group relationship definition
    blocks = association_proxy('block_parcels', 'block',)

    # Parcel relationship definition
    parcels_add = association_proxy('parcel_groups', 'parcel',)

    @property
    def parcels(self):
        return ReferenceParcel.join(ReferenceParcelRelation, (ReferenceParcelRelation.parcel_id == ReferenceParcel.parcel_id)).filter(
            ReferenceParcelRelation.block_id == self.parcel_id).all()
        #return session.query(Node).join(NodeRelation, (NodeRelation.child_id == Node.id)).filter(
            #NodeRelation.parent_id == self.id).all()

    __repr_props__ = ('id', 'title', 'parcels')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.parcel_id == id)