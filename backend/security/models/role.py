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


    __repr_props__ = ('id', 'name')