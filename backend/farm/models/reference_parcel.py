#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
from sqlalchemy.orm.collections import attribute_mapped_collection
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
    TimestampMixin,
    BaseModel,
    association_proxy,
    relationship,
    foreign_key
)
from .reference_parcel_relation import ReferenceParcelRelation
from .reference_parcel_mixin import ReferenceParcelMixin
from .reference_parcel_property import ReferenceParcelProperty

def create_production(production):
    from ..models import ReferenceParcelProduction
    return ReferenceParcelProduction(production=production)


class ReferenceParcelTypes(enum.Enum):
    AgriculturalParcel = 'AgriculturalParcel'
    CadastralParcel = 'CadastralParcel'
    FarmersBlock = 'FarmersBlock'
    PhysicalBlock = 'PhysicalBlock'



class ReferenceParcel(ReferenceParcelMixin, TimestampMixin, BaseModel):
    #id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String(64), nullable=True)
    notes = Column(String(256), nullable=True)

    geometry = Column(Geometry("POLYGON"))  # TODO: Do I need to specify the srid or not?

    total_area = Column(Float(), nullable=False)
    eligible_area = Column(Float(), nullable=False)

    soil_type_id = foreign_key('SoilType', nullable=False)
    soil_type = relationship('SoilType', uselist=False)

    # Reference Parcel Type relationship definition
    agricultural_type_id = foreign_key('AgriculturalType', nullable=False)
    agricultural_type = relationship('AgriculturalType', uselist=False)

    # Season relationship definition
    # FIXME: Would be better to set nullable=False, but that require a major update in the unit test setup.
    season_id = foreign_key('Season', nullable=True, onupdate="CASCADE", ondelete="CASCADE")
    season = relationship('Season', back_populates='reference_parcels')

    # Group relationship definition
    groups = association_proxy('group_parcels', 'group',)

    # Parcel relationship definition
    parcels_add = association_proxy('parcel_groups', 'parcel',)

    @property
    def parcels(self):
        return ReferenceParcel.join(ReferenceParcelRelation, (ReferenceParcelRelation.parcel_id == ReferenceParcel.parcel_id)).filter(
            ReferenceParcelRelation.group_id == self.parcel_id).all()
        #return session.query(Node).join(NodeRelation, (NodeRelation.child_id == Node.id)).filter(
            #NodeRelation.parent_id == self.id).all()

    # Production relationship definition
    reference_parcel_productions = relationship('ReferenceParcelProduction', back_populates='reference_parcel',
                                            cascade='all, delete-orphan')
    productions = association_proxy('reference_parcel_productions', 'production',
                                      creator=lambda production: create_production(production))


    property = relationship(
        "ReferenceParcelProperty", collection_class=attribute_mapped_collection("key")
    )

    properties = association_proxy(
        "property",
        "value",
        creator=lambda key, value: ReferenceParcelProperty(key=key, value=value),
    )

    __repr_props__ = ('id', 'title', 'parcels')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.parcel_id == id)