#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
# Internal package imports
from backend.database import (
    Column,
    Model,
    String,
    Boolean
)

class NewsletterSubscribe(Model):
    email = Column(String(50), index=True, unique=True)
    is_active = Column(Boolean(name='is_active'), default=True)

    __repr_props__ = ('id', 'email', 'is_active')
