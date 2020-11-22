#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import enum
# Pip package imports
from sqlalchemy import asc
import sqlalchemy as sa
# Internal package imports
from backend.database import (
    Column,
    BigInteger,
    String,
    Boolean,
    TimestampMixin,
    BaseModel,
    DateTime,
    Enum,
    relationship,
    foreign_key,
    association_proxy
)
from .plan_mixin import PlanMixin
from backend.security.models.resource import Resource

class Plan(Resource):
    __mapper_args__ = {'polymorphic_identity': 'plan'}

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.resource_id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    title = Column(String(128))

    # Plan execution relation
    plan_executions = relationship('PlanExecution', cascade="all, delete", back_populates='plan')

    tasks = relationship('PlanTask',
                         back_populates='plan',
                         order_by="asc(PlanTask.start_date)",
                         cascade='all, delete-orphan')

    __repr_props__ = ('plan_id', 'title', 'specific_products', )
