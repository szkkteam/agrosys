#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    BaseModel,
    TimestampMixin,
    String,
    association_proxy,
    relationship,
    foreign_key,
)
from backend.security.models import User


class Profile(TimestampMixin, BaseModel):

    display_name = Column(String(64))

    id = foreign_key('User', primary_key=True)
    user = relationship('User', back_populates='profile',
                        cascade='all, delete-orphan', single_parent=True)


    __repr_props__ = ('display_name', 'user_id')

    @classmethod
    def create_default_profile(cls, user=user):
        return cls.create(
            display_name=user.username,
            user=user,
            commit=False
        )