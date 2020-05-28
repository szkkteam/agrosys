#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Boolean,
    association_proxy,
    relationship,
    foreign_key,
)
from .profile_farm import ProfileFarm
from backend.security.models import User

class Profile(Model):

    display_name = Column(String(64))

    user_id = foreign_key('User')
    user = relationship('User', back_populates='profile',
                        cascade='all, delete-orphan', single_parent=True)

    profile_farms = relationship('ProfileFarm', back_populates='profile',
                              cascade='all, delete-orphan')
    farms = association_proxy('profile_farms', 'farm',
                              creator=lambda farm: ProfileFarm(farm=farm))

    __repr_props__ = ('id', 'user_id')

    @classmethod
    def create_default_profile(cls, user=user):
        return cls.create(
            display_name=user.username,
            user=user,
            commit=False
        )