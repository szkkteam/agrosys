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
    Float,
    relationship,
    foreign_key,
    association_proxy
)
from .task_mixin import TaskMixin

class Task(TaskMixin, TimestampMixin, BaseModel):

    title = Column(String(64), nullable=True)
    description = Column(String(256), nullable=True)

    start_date = Column(DateTime)
    end_date = Column(DateTime)

    predicted_cost = Column(Float)
    actual_cost = Column(Float)

    production_id = foreign_key('Production', nullable=False)
    production = relationship('Production', back_populates='tasks')
