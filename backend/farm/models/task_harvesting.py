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
from .task import Task


class TaskHarvesting(Task):
    __mapper_args__ = {'polymorphic_identity': 'task_harvesting'}

    id = foreign_key('Task', fk_col='task_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")


    specific_product_id = foreign_key('SpecificProduct', nullable=False)
    specific_product = relationship('SpecificProduct')


    __repr_props__ = ('id', 'title', 'task_type', )
