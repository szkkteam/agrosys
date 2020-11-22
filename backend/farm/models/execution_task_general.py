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
    foreign_key,
    association_proxy
)
from .execution_task import ExecutionTask
from .task_mixin import TaskTypes


class ExecutionTaskGeneral(ExecutionTask):
    __mapper_args__ = {'polymorphic_identity': TaskTypes.TaskGeneral.value}

    id = foreign_key('ExecutionTask', fk_col='task_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    __repr_props__ = ('id', 'title', 'task_type', )
