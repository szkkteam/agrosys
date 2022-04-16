#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    BigInteger,
    String,
    relationship,
    Float,
    foreign_key,
    association_proxy
)
from .execution_task import ExecutionTask
from .task_mixin import TaskTypes


class ExecutionTaskHarvesting(ExecutionTask):
    __mapper_args__ = {'polymorphic_identity': TaskTypes.TaskHarvesting.value}

    id = foreign_key('ExecutionTask', fk_col='task_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    crop_yield = Column(Float())

    __repr_props__ = ('id', 'title', 'task_type', )
