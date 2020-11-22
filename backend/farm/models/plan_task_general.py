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
from .plan_task import PlanTask
from .task_mixin import TaskTypes

class PlanTaskGeneral(PlanTask):
    __mapper_args__ = {'polymorphic_identity': TaskTypes.TaskGeneral.value}

    id = foreign_key('PlanTask', fk_col='task_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    __repr_props__ = ('id', 'title', 'task_type', )