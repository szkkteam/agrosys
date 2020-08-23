#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import sqlalchemy as sa
from sqlalchemy.orm import with_polymorphic
from flask_security import current_user

# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Integer,
    Float,
    Date,
    relationship,
    association_proxy,
    foreign_key
)
from backend.security.models import User, Resource
from backend.permissions.services import UserService
from ..models import Plan

class CropTemplate(Model):
    title = Column(String(64), nullable=True)

    crop_base_id = foreign_key('CropBase', nullable=False)
    crop_base = relationship('CropBase', back_populates='crop_templates')

    crop_cultivation_type_id = foreign_key('CropCultivationType', nullable=False)
    crop_cultivation_type = relationship('CropCultivationType', back_populates='crop_templates')

    crop_variant_id = foreign_key('CropVariant', nullable=False)
    crop_variant = relationship('CropVariant', back_populates='crop_templates')

    plans = relationship('Plan', back_populates='crop_template')


    __repr_props__ = ('id', 'title', 'production_templates')
