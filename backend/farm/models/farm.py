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

class Farm(Resource):
    __mapper_args__ = {'polymorphic_identity': 'farm'}
    title = Column(String(64))

    id = sa.Column(sa.Integer(),
                   sa.ForeignKey('resource.resource_id',
                                 onupdate='CASCADE',
                                 ondelete='CASCADE', ),
                   primary_key=True, )

    reference_parcels = relationship('ReferenceParcel', cascade="all, delete", back_populates='farm')
    # TODO: Define later lazy relationship
    #seasons = relationship('Season', cascade="all,delete", back_populates='farm', lazy='noload')

    __repr_props__ = ('id', 'title', 'owner_user_id', 'fields')

    def __init__(self, **kwargs):
        if 'fields' in kwargs:
            fields = kwargs.pop('fields')
            print("Appending fields: ", fields)
            if isinstance(fields, list):
                self.fields.extend(fields)
            else:
                self.fields.append(fields)
        super().__init__(**kwargs)