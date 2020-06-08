#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    String,
    Float,
    Boolean,
    foreign_key,
    relationship,
)

class UserFarm(BaseModel):
    """Join table between User and Role"""

    # Farm roles
    is_owner = Column(Boolean(name='owner'), default=True)

    # Field roles
    can_create_fields = Column(Boolean(), default=True)
    can_edit_fields = Column(Boolean(), default=True)
    can_delete_fields = Column(Boolean(), default=True)

    user_id = foreign_key('User', primary_key=True)
    user = relationship('User', back_populates='user_farms')

    farm_id = foreign_key('Farm', primary_key=True)
    farm = relationship('Farm', back_populates='farm_users')


    __repr_props__ = ('user_id', 'farm_id', 'is_owner')

    def __init__(self, user=None, farm=None, **kwargs):
        super().__init__(**kwargs)
        if user:
            self.user = user
        if farm:
            self.farm = farm

    @classmethod
    def create_farm_owner(self, user, farm, **kwargs):
        return UserFarm(user=user, farm=farm, is_owner=True, **kwargs)