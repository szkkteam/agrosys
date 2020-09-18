#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import sqlalchemy as sa
# Pip package imports

# Internal package imports
from backend.database import (
    Column,
    BigInteger,
    String,
    relationship,
    foreign_key,
    association_proxy
)
from .reference_parcel import ReferenceParcel


class CadastralParcel(ReferenceParcel):
    __mapper_args__ = {'polymorphic_identity': 'cadastral_parcel'}

    id = foreign_key('ReferenceParcel', fk_col='parcel_id', primary_key=True, onupdate="CASCADE", ondelete="CASCADE")

    __repr_props__ = ('id', 'title', 'parcel_type', )
