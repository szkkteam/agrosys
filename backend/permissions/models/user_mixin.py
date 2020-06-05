#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import validates

# Internal package imports
from .base import BaseModel

__all__ = ["UserMixin"]

class UserMixin(BaseModel):
    """ Base mixin for User object representation.
        It supplies all the basic functionality from password hash generation
        and matching to utility methods used for querying database for users
        and their permissions or resources they have access to. It is meant
        to be extended with other application specific properties"""

    __mapper_args__ = {}
    __table_args__ = {"mysql_engine": "InnoDB", "mysql_charset": "utf8"}

    @declared_attr
    def __tablename__(self):
        return "users"

    @declared_attr
    def groups_dynamic(self):
        """ returns dynamic relationship for groups - allowing for
        filtering of data """
        return sa.orm.relationship(
            "Group",
            secondary="users_groups",
            lazy="dynamic",
            passive_deletes=True,
            passive_updates=True,
        )

    @declared_attr
    def id(self):
        """ Unique identifier of user object"""
        return sa.Column(sa.Integer, primary_key=True, autoincrement=True)

    @declared_attr
    def user_permissions(self):
        """
        returns all direct non-resource permissions for this user,
        allows to assign new permissions to user::

            user.user_permissions.append(resource)
        """
        return sa.orm.relationship(
            "UserPermission",
            cascade="all, delete-orphan",
            passive_deletes=True,
            passive_updates=True,
        )

    @declared_attr
    def resource_permissions(self):
        """ returns all direct resource permissions for this user """
        return sa.orm.relationship(
            "UserResourcePermission",
            cascade="all, delete-orphan",
            passive_deletes=True,
            passive_updates=True,
        )

    @declared_attr
    def resources(self):
        """ Returns all resources directly owned by user, can be used to assign
        ownership of new resources::

            user.resources.append(resource) """
        return sa.orm.relationship(
            "Resource",
            cascade="all",
            passive_deletes=True,
            passive_updates=True,
            backref="owner",
            lazy="dynamic",
        )

    @declared_attr
    def external_identities(self):
        """ dynamic relation for external identities for this user -
        allowing for filtering of data """
        return sa.orm.relationship(
            "ExternalIdentity",
            lazy="dynamic",
            cascade="all, delete-orphan",
            passive_deletes=True,
            passive_updates=True,
            backref="owner",
        )
