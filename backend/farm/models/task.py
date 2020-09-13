#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import enum

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

class TaskStatus(enum.Enum):
    Deleted = 'Deleted'
    Pending = 'Pending'
    Completed = 'Completed'
    Archived = 'Archived'

class TaskTypes(enum.Enum):
    TaskGeneral = 'TaskGeneral'
    TaskPruning = 'TaskPruning'
    TaskHarvesting = 'TaskHarvesting'


class Task(TaskMixin, TimestampMixin, BaseModel):

    title = Column(String(64), nullable=True)
    description = Column(String(256), nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.Pending)

    start_date = Column(DateTime(timezone=False))
    end_date = Column(DateTime(timezone=False))

    predicted_cost = Column(Numeric, nullable=True)
    actual_cost = Column(Numeric, nullable=True)

    plan_id = foreign_key('Plan', fk_col='plan_id', nullable=False, onupdate="CASCADE", ondelete="CASCADE")
    plan = relationship('Plan', back_populates='tasks')
