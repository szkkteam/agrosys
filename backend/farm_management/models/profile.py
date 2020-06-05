#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    TimestampMixin,
    String,
    association_proxy,
    relationship,
    foreign_key,
)


class Profile(Model):

    display_name = Column(String(64))



    __repr_props__ = ('display_name')

    @classmethod
    def create_default_profile(cls, user=None):
        return cls.create(
            display_name=user.username,
            commit=False
        )