#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import RoleMixin

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    association_proxy,
    relationship,
)
from .user_role import UserRole

class Role(Model, RoleMixin):
    name = Column(String(50), unique=True, index=True)
    description = Column(String(255), nullable=True)

    role_users = relationship('UserRole', back_populates='role',
                              cascade='all, delete-orphan')
    users_renamed = association_proxy('role_users', 'user',
                              creator=lambda user: UserRole(user=user))

    __repr_props__ = ('id', 'name')