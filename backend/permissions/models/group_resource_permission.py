#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import validates

# Internal package imports
from .base import BaseModel


__all__ = ["GroupResourcePermissionMixin"]


class GroupResourcePermissionMixin(BaseModel):
    """
    Mixin for GroupResourcePermission model
    """

    __table_args__ = (
        sa.PrimaryKeyConstraint(
            "group_id",
            "resource_id",
            "perm_name",
            name="pk_users_resources_permissions ",
        ),
        {"mysql_engine": "InnoDB", "mysql_charset": "utf8"},
    )

    @declared_attr
    def group_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("groups.id", onupdate="CASCADE", ondelete="CASCADE"),
            primary_key=True,
        )

    @declared_attr
    def resource_id(self):
        return sa.Column(
            sa.Integer(),
            sa.ForeignKey(
                "resources.resource_id", onupdate="CASCADE", ondelete="CASCADE"
            ),
            primary_key=True,
            autoincrement=False,
        )

    @declared_attr
    def perm_name(self):
        return sa.Column(sa.Unicode(50), primary_key=True)

    @validates("perm_name")
    def validate_perm_name(self, key, value):
        if value != value.lower():
            raise AssertionError("perm_name needs to be lowercase")
        return value

    __repr_props__ = ('group_id', 'perm_name', 'resource_id')
