#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import UserMixin
from flask_security.utils import hash_password as security_hash_password

# Internal package imports
from backend.database import (
    Boolean,
    Column,
    DateTime,
    Model,
    String,
    association_proxy,
    relationship,
)
from .user_role import UserRole

def create_user_farm(farm):
    from backend.farm_management.models import UserFarm
    return UserFarm(farm=farm)

class User(Model, UserMixin):
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    first_name = Column(String(32))
    last_name = Column(String(64))
    password = Column(String, nullable=True)
    active = Column(Boolean(name='active'), default=False)
    confirmed_at = Column(DateTime(), nullable=True)

    # Only used when SECURITY_TRACKABLE is set to True in config.py
    # last_login_at = Column(DateTime(), nullable=True)
    # current_login_at = Column(DateTime(), nullable=True)
    # last_login_ip = Column(String(100))
    # current_login_ip = Column(String(100))
    # login_count = Column(Integer)

    profile = relationship('Profile', uselist=False, back_populates='user')

    user_farms = relationship('UserFarm', back_populates='user',
                                 cascade='all, delete-orphan')
    farms = association_proxy('user_farms', 'farm',
                              creator=lambda farm: create_user_farm(farm))

    user_roles = relationship('UserRole', back_populates='user',
                              cascade='all, delete-orphan')
    roles = association_proxy('user_roles', 'role',
                              creator=lambda role: UserRole(role=role))

    __repr_props__ = ('id', 'username', 'email')

    def __init__(self, hash_password=True, **kwargs):
        super().__init__(**kwargs)
        if 'password' in kwargs and hash_password:
            self.password = security_hash_password(kwargs['password'])