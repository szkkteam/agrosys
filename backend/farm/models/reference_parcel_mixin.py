#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import validates

# Internal package imports
from backend.database import (
    Column,
    Model,
    BaseModel,
    String,
    association_proxy,
    relationship,
    TimestampMixin
)


class ReferenceParcelMixin(object):
    """
    Mixin for Resource model
    """

    @declared_attr
    def parcel_id(self):
        return sa.Column(
            sa.Integer(), primary_key=True, nullable=False, autoincrement=True
        )

    @declared_attr
    def ancestor_id(self):
        return sa.Column(
            sa.Integer(),
            sa.ForeignKey(
                "reference_parcel.parcel_id", onupdate="CASCADE", ondelete="CASCADE"
            ),
        )

    @declared_attr
    def ordering(self):
        return sa.Column(sa.Integer(), default=0, nullable=False)

    @declared_attr
    def parcel_name(self):
        return sa.Column(sa.Unicode(100), nullable=False, default=self.__plural__)

    @declared_attr
    def parcel_type(self):
        return sa.Column(sa.Unicode(30), nullable=False)

    __mapper_args__ = {"polymorphic_on": parcel_type}
    __table_args__ = {"mysql_engine": "InnoDB", "mysql_charset": "utf8"}

    __repr_props__ = ('task_type', 'task_name', 'task_id', 'ordering',)
