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
    String,
    association_proxy,
    relationship,
    TimestampMixin
)
from .base import BaseModel


__all__ = ["UserGroupMixin"]


class UserGroupMixin(BaseModel):
    """
    Mixin for UserGroup model
    """

    __table_args__ = {"mysql_engine": "InnoDB", "mysql_charset": "utf8"}

    @declared_attr
    def group_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("group.id", onupdate="CASCADE", ondelete="CASCADE"),
            primary_key=True,
        )

    @declared_attr
    def user_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("user.id", onupdate="CASCADE", ondelete="CASCADE"),
            primary_key=True,
        )

    __repr_props__ = ('group_id', 'user_id')