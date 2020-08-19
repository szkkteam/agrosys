#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import enum
# Pip package imports
from flask_security import current_user
from geoalchemy2 import Geometry

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Integer,
    Float,
    Date,
    Enum,
    relationship,
    association_proxy,
    foreign_key
)

class ReferenceParcelTypeEnum(enum.Enum):
    AgriculturalParcel = 1
    CadastralParcel = 2
    FarmersBlock = 3
    PhysicalBlock = 4

class ReferenceParcelType(Model):
    code = Column(Enum(ReferenceParcelTypeEnum), default=ReferenceParcelTypeEnum.AgriculturalParcel)
    title = Column(String(64), nullable=False)
    description = Column(String(64), nullable=True)

    __repr_props__ = ('id', 'title', 'code')
