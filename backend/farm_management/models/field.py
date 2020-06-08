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
    Float,
    Boolean,
    association_proxy,
    relationship,
    foreign_key
)


def create_season_field(season):
    from .season_field import SeasonField
    return SeasonField(season=season)


class Field(Model):
    name = Column(String(64))

    field_seasons = relationship('SeasonField', back_populates='field',
                              cascade='all, delete-orphan')
    seasons = association_proxy('field_seasons', 'field',
                              creator=lambda season: create_season_field(season))

    __repr_props__ = ('id', 'name', 'value')

    @classmethod
    def all(cls):
        from .user_farm import UserFarm
        if current_user and hasattr(current_user, 'id'):
            return Field.join(UserFarm, UserFarm.farm_id == Field.farm_id).filter(UserFarm.user_id == current_user.id)
        return super().all()