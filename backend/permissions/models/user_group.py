#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import validates

# Internal package imports
from .base import BaseModel


__all__ = ["UserGroupMixin"]


class UserGroupMixin(BaseModel):
    """
    Mixin for UserGroup model
    """

    __table_args__ = {"mysql_engine": "InnoDB", "mysql_charset": "utf8"}

    @declared_attr
    def __tablename__(self):
        return "users_groups"

    @declared_attr
    def group_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("groups.id", onupdate="CASCADE", ondelete="CASCADE"),
            primary_key=True,
        )

    @declared_attr
    def user_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"),
            primary_key=True,
        )

    __repr_props__ = ('group_id', 'user_id')