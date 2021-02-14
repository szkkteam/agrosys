#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
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


class PlanExecutionGroup(Model):
    title = Column(String(64), nullable=True)

    # PlanExecution relation
    plan_executions = relationship('PlanExecution', cascade="all, delete", back_populates='group')

    __repr_props__ = ('id', 'title')

