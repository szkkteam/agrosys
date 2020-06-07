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

__all__ = ["ResourceMixin"]


class ResourceMixin(BaseModel):
    """
    Mixin for Resource model
    """

    __possible_permissions__ = ()

    @declared_attr
    def parent_id(self):
        return sa.Column(
            sa.Integer(),
            sa.ForeignKey(
                "resource.id", onupdate="CASCADE", ondelete="SET NULL"
            ),
        )

    @declared_attr
    def ordering(self):
        return sa.Column(sa.Integer(), default=0, nullable=False)

    @declared_attr
    def resource_name(self):
        return sa.Column(sa.Unicode(100), nullable=False)

    @declared_attr
    def resource_type(self):
        return sa.Column(sa.Unicode(30), nullable=False)

    @declared_attr
    def owner_group_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("group.id", onupdate="CASCADE", ondelete="SET NULL"),
            index=True,
        )

    @declared_attr
    def owner_user_id(self):
        return sa.Column(
            sa.Integer,
            sa.ForeignKey("user.id", onupdate="CASCADE", ondelete="SET NULL"),
            index=True,
        )

    @declared_attr
    def group_permissions(self):
        """ returns all group permissions for this resource"""
        return sa.orm.relationship(
            "GroupResourcePermission",
            cascade="all, delete-orphan",
            passive_deletes=True,
            passive_updates=True,
        )

    @declared_attr
    def user_permissions(self):
        """ returns all user permissions for this resource"""
        return sa.orm.relationship(
            "UserResourcePermission",
            cascade="all, delete-orphan",
            passive_deletes=True,
            passive_updates=True,
        )

    @declared_attr
    def groups(self):
        """ returns all groups that have permissions for this resource"""
        return sa.orm.relationship(
            "Group",
            secondary="group_resource_permission",
            passive_deletes=True,
            passive_updates=True,
        )

    @declared_attr
    def users(self):
        """ returns all users that have permissions for this resource"""
        return sa.orm.relationship(
            "User",
            secondary="user_resource_permission",
            passive_deletes=True,
            passive_updates=True,
        )

    __mapper_args__ = {"polymorphic_on": resource_type}
    __table_args__ = {"mysql_engine": "InnoDB", "mysql_charset": "utf8"}

    __repr_props__ = ('resource_type', 'resource_name', 'id', 'ordering',)

    @property
    def __acl__(self):
        raise NotImplementedError("Model should implement __acl__")

    @sa.orm.validates("user_permissions", "group_permissions")
    def validate_permission(self, key, permission):
        """ validate if resource can have specific permission """
        if permission.perm_name not in self.__possible_permissions__:
            raise AssertionError(
                "perm_name is not one of {}".format(self.__possible_permissions__)
            )
        return permission