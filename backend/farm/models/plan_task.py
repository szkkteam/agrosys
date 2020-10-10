#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    String,
    TimestampMixin,
    Boolean,
    DateTime,
    Numeric,
    Enum,
    relationship,
    foreign_key,
    association_proxy
)
from .task_mixin import TaskMixin


class PlanTask(TaskMixin, TimestampMixin, BaseModel):

    title = Column(String(64), nullable=True)
    description = Column(String(256), nullable=True)

    start_date = Column(DateTime(timezone=False))
    end_date = Column(DateTime(timezone=False))

    cost = Column(Numeric, nullable=True)

    plan_id = foreign_key('Plan', nullable=False, onupdate="CASCADE", ondelete="CASCADE")
    plan = relationship('Plan', back_populates='tasks')

    execution_task = relationship('ExecutionTask',
                         back_populates='plan_task',
                         cascade='all, delete-orphan')
