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
from .task_mixin import TaskMixin, TaskStatus


class ExecutionTask(TaskMixin, TimestampMixin, BaseModel):

    title = Column(String(64), nullable=True)
    description = Column(String(256), nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.Pending)

    start_date = Column(DateTime(timezone=False))
    end_date = Column(DateTime(timezone=False))

    cost = Column(Numeric, nullable=True)

    plan_execution_id = foreign_key('PlanExecution', nullable=False, onupdate="CASCADE", ondelete="CASCADE")
    plan_execution = relationship('PlanExecution', back_populates='tasks')

    plan_task_id = foreign_key('PlanTask', fk_col='task_id', nullable=False, onupdate="CASCADE")
    plan_task = relationship('PlanTask', back_populates='execution_task', uselist=False)