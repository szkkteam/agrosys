#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
from sqlalchemy import orm
# alias common names
from sqlalchemy import UniqueConstraint
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_method, hybrid_property
# Internal package imports
from backend.extensions import db

from .base_model import BaseModel
from .column import Column
from .events import attach_events, on, slugify
from .mixins import PrimaryKeyMixin, TimestampMixin, ProxiedDictMixin
from .model import Model
from .relationships import backref, foreign_key, relationship
from .types import (
    BigInteger,
    Boolean,
    Date,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    Interval,
    Numeric,
    SmallInteger,
    String,
    Text,
    Time,
    ImageColumn,
    Unicode,
)

session = db.session  # type: orm.session.Session
