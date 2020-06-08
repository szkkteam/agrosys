#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
from flask_security import current_user

# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    String,
    relationship
)
from backend.security.models.resource import Resource
from backend.permissions.services import UserService
from backend.permissions.permissions import ANY_PERMISSION

class Farm(Resource):
    __mapper_args__ = {'polymorphic_identity': 'farm'}
    name = Column(String(64))

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    seasons = relationship('Season', back_populates='farm')

    __repr_props__ = ('id', 'name')

    @classmethod
    def all(cls):
        if current_user and hasattr(current_user, 'id'):
            from backend.security.models import User
            user = User.get(current_user.id)
            print("User: ", user)
            res =  UserService.resources_with_perms(user, ['view_permission'], resource_types=['farm']).all()
            #res = UserService.resources_with_perms(user, ['view_permission'], resource_types=cls.__plural__).all()
            print("Res: ", res)
            return res
        return super().all()