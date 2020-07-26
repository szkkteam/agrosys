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


class TaskGeneral(Task):
    __mapper_args__ = {'polymorphic_identity': 'task_general'}

    id = sa.Column(BigInteger,
                   sa.ForeignKey('task.task_id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )


    __repr_props__ = ('id', 'title', 'owner_user_id', 'field_details', 'farm_id')
