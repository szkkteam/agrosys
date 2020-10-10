#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
from sqlalchemy import asc
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Float,
    DateTime,
    BigInteger,
    Boolean,
    Enum,
    association_proxy,
    relationship,
    foreign_key
)


class PlanExecution(Model):
    title = Column(String(64), nullable=True)

    # Agricultural parcel relation
    agricultural_parcel_id = foreign_key('AgriculturalParcel', nullable=False, ondelete='CASCADE', )
    agricultural_parcel = relationship('AgriculturalParcel', back_populates='plan_executions')

    # Plan relation
    plan_id = foreign_key('Plan', nullable=False, ondelete='CASCADE', )
    plan = relationship('Plan', back_populates='plan_executions')

    # PlanExecutionGroup relation
    group_id = foreign_key('PlanExecutionGroup', nullable=False, ondelete='CASCADE', )
    group = relationship('PlanExecutionGroup', back_populates='plan_executions')

    tasks = relationship('ExecutionTask',
                         back_populates='plan_execution',
                         order_by="asc(ExecutionTask.start_date)",
                         cascade='all, delete-orphan')

    archived_at = Column(DateTime, default=None, nullable=True)

    __repr_props__ = ('id', 'title')


    @classmethod
    def query_permission_obj(cls, id, *args, **kwargs):
        from .farm import Farm
        return Farm.join(cls).filter(cls.id == id)