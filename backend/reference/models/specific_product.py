#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from sqlalchemy.orm.collections import attribute_mapped_collection
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    ProxiedDictMixin,
    String,
    Integer,
    Float,
    Date,
    relationship,
    association_proxy,
    foreign_key
)
from .specific_product_property import SpecificProductProperty
from backend.farm.models import PlanSpecificProduct

def create(plan):
    from backend.farm.models import PlanSpecificProduct
    return PlanSpecificProduct(plan=plan)


class SpecificProduct(Model):
    title = Column(String(64))

    description = Column(String(256), nullable=True)
    base_yield = Column(Float())

    #field_details = relationship('FieldDetail', back_populates='soil_type')
    unit_id = foreign_key('Unit', nullable=False)
    unit = relationship('Unit', uselist=False)

    agricultural_product_facts = relationship('AgriculturalProductFact', back_populates='specific_product')

    property = relationship(
        "SpecificProductProperty", collection_class=attribute_mapped_collection("key")
    )

    properties = association_proxy(
        "property",
        "value",
        creator=lambda key, value: SpecificProductProperty(key=key, value=value),
    )

    specific_product_plans = relationship('PlanSpecificProduct', back_populates='specific_product',
                                                cascade='all, delete-orphan')
    plans = association_proxy('specific_product_plans', 'plan',
                                    creator=lambda plan: create(plan))

    __repr_props__ = ('id', 'title', 'unit')
