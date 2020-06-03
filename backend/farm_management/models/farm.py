#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import current_user

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Boolean,
    association_proxy,
    relationship,
)

def create_user_farm(user):
    from .user_farm import UserFarm
    return UserFarm(user=user)

class Farm(Model):
    name = Column(String(64))

    farm_users = relationship('UserFarm', back_populates='farm',
                              cascade='all, delete-orphan')
    users = association_proxy('farm_users', 'farmer',
                              creator=lambda user: create_user_farm(user))

    fields = relationship('Field', back_populates='farm')

    __repr_props__ = ('id', 'name')

    @classmethod
    def all(cls):
        from .user_farm import UserFarm
        if current_user and hasattr(current_user, 'id'):
            return Farm.join(UserFarm).filter(UserFarm.user_id == current_user.id).all()
        return super().all()