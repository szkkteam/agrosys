#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from flask_security import current_user
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Integer,
    Boolean,
    relationship,
    association_proxy,
    foreign_key
)


def create_season_field(field):
    from .season_field import SeasonField
    return SeasonField(field=field)


class Season(Model):
    year = Column(Integer())

    farm_id = foreign_key('Farm', nullable=False)
    farm = relationship('Farm', back_populates='seasons')


    season_fields = relationship('SeasonField', back_populates='season',
                                 cascade='all, delete-orphan')
    fields = association_proxy('season_fields', 'field',
                              creator=lambda field: create_season_field(field))


    __repr_props__ = ('id', 'year')

    @classmethod
    def all(cls):
        from .user_farm import UserFarm
        if current_user and hasattr(current_user, 'id'):
            return Season.join(UserFarm, UserFarm.farm_id == Season.farm_id).filter(UserFarm.user_id == current_user.id)
        return super().all()